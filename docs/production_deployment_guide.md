# Backend Production Deployment Guide

## Overview
This document outlines the steps and considerations for deploying the Quranic Quest backend to a production environment. The backend consists of a Python FastAPI application with AI functionality for pronunciation assessment and personalized learning paths.

## Infrastructure Requirements

### Compute Resources
- **Recommended**: AWS EC2 or equivalent
- **Instance Type**: t3.medium (minimum)
- **Scaling**: Set up auto-scaling group with min 2, max 5 instances
- **Load Balancer**: Application Load Balancer with HTTPS

### Database
- **Type**: PostgreSQL 13+
- **Instance**: AWS RDS db.t3.medium (minimum)
- **Storage**: 100GB with automatic scaling
- **Backup**: Daily automated backups with 7-day retention
- **Read Replicas**: Consider for high traffic

### AI Services
- **OpenAI API**: Production account with appropriate rate limits
- **Audio Processing**: Dedicated instances for audio processing workloads
- **Model Caching**: Redis for caching common assessment results

### Storage
- **User Content**: AWS S3 bucket for audio recordings and user-generated content
- **Static Assets**: CDN (CloudFront) for static content delivery

### Networking
- **VPC**: Private subnets for application and database
- **Security Groups**: Restrict access appropriately
- **WAF**: Web Application Firewall for security

## Deployment Steps

### 1. Environment Setup

```bash
# Create production environment
python -m venv prod_env
source prod_env/bin/activate

# Install production dependencies
pip install -r requirements.txt

# Install production-specific packages
pip install gunicorn uvicorn[standard] prometheus-client
```

### 2. Environment Variables

Create a `.env.production` file with the following variables (use secure values):

```
# API Configuration
API_ENV=production
DEBUG=False
SECRET_KEY=<strong-random-key>
ALLOWED_HOSTS=api.quranicquest.com

# Database
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>

# OpenAI
OPENAI_API_KEY=<production-key>

# AWS
AWS_ACCESS_KEY_ID=<access-key>
AWS_SECRET_ACCESS_KEY=<secret-key>
AWS_STORAGE_BUCKET_NAME=quranicquest-production
AWS_S3_REGION_NAME=us-east-1

# Redis
REDIS_URL=redis://<host>:<port>

# Stripe
STRIPE_API_KEY=<live-key>
STRIPE_WEBHOOK_SECRET=<webhook-secret>

# Security
CORS_ALLOWED_ORIGINS=https://quranicquest.com
JWT_ALGORITHM=HS256
JWT_EXPIRATION=86400
```

### 3. Database Migration

```bash
# Run migrations
alembic upgrade head

# Seed initial data if needed
python scripts/seed_production_data.py
```

### 4. Application Server Configuration

Create a `gunicorn.conf.py` file:

```python
# Gunicorn configuration
bind = "0.0.0.0:8000"
workers = 4  # (2 * num_cores) + 1
worker_class = "uvicorn.workers.UvicornWorker"
keepalive = 65
timeout = 120
graceful_timeout = 30
max_requests = 1000
max_requests_jitter = 50
accesslog = "/var/log/quranicquest/access.log"
errorlog = "/var/log/quranicquest/error.log"
loglevel = "info"
```

### 5. Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.quranicquest.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.quranicquest.com;
    
    ssl_certificate /etc/letsencrypt/live/api.quranicquest.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.quranicquest.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Other security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # Proxy settings
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files
    location /static/ {
        alias /var/www/quranicquest/static/;
        expires 1d;
    }
    
    # Media files (user uploads)
    location /media/ {
        alias /var/www/quranicquest/media/;
        expires 1d;
    }
}
```

### 6. Systemd Service

Create a systemd service file at `/etc/systemd/system/quranicquest.service`:

```ini
[Unit]
Description=Quranic Quest API Service
After=network.target

[Service]
User=quranicquest
Group=quranicquest
WorkingDirectory=/opt/quranicquest
Environment="PATH=/opt/quranicquest/prod_env/bin"
EnvironmentFile=/opt/quranicquest/.env.production
ExecStart=/opt/quranicquest/prod_env/bin/gunicorn -c gunicorn.conf.py main:app
Restart=on-failure
RestartSec=5s
StartLimitInterval=60s
StartLimitBurst=3

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable quranicquest
sudo systemctl start quranicquest
```

## Monitoring and Logging

### Logging Configuration

Configure structured JSON logging in the application:

```python
# logging_config.py
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        if hasattr(record, 'request_id'):
            log_record["request_id"] = record.request_id
            
        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)
            
        return json.dumps(log_record)
```

### Monitoring Setup

1. **Prometheus Metrics**:
   - Instrument the application with Prometheus metrics
   - Monitor request counts, latencies, error rates

2. **Grafana Dashboards**:
   - API performance dashboard
   - Error rate dashboard
   - Resource utilization dashboard

3. **Alerting**:
   - Set up alerts for:
     - High error rates
     - Slow API responses
     - Database connection issues
     - High resource utilization

## Security Considerations

### API Security
- Implement rate limiting
- Use proper authentication and authorization
- Validate all inputs
- Sanitize user content

### Data Security
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper access controls
- Regular security audits

### Compliance
- Ensure GDPR compliance for EU users
- Implement data retention policies
- Provide data export functionality
- Document all data processing activities

## Backup and Recovery

### Database Backups
- Daily automated backups
- Point-in-time recovery capability
- Test restoration procedures regularly

### Application Backups
- Version control for all code
- Infrastructure as Code for environment
- Document manual recovery procedures

## Scaling Considerations

### Horizontal Scaling
- Add more application servers during peak times
- Configure auto-scaling based on CPU/memory metrics

### Vertical Scaling
- Upgrade instance types for higher performance
- Monitor resource utilization to determine needs

### Database Scaling
- Read replicas for read-heavy workloads
- Consider sharding for very large datasets

## Production Checklist

- [ ] SSL certificates configured
- [ ] Database backups verified
- [ ] Monitoring and alerting set up
- [ ] Load testing completed
- [ ] Security scan performed
- [ ] Rate limiting configured
- [ ] Error handling verified
- [ ] Logging properly configured
- [ ] Documentation updated
- [ ] Rollback procedure documented and tested
- [ ] Performance benchmarks established
- [ ] Compliance requirements met
