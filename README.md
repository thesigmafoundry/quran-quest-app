# Quranic Quest

![Quranic Quest](docs/images/logo.png)

An AI-driven Quran learning platform designed specifically for Muslim immigrant families in Western countries. The platform combines traditional teaching methods with cutting-edge AI technology to create an engaging and effective learning experience.

## 🌟 Features

- **AI-Powered Pronunciation Feedback**: Real-time feedback on Quranic recitation using advanced speech recognition
- **Personalized Learning Paths**: Adaptive curriculum that adjusts to each child's learning pace
- **Interactive Voice Conversations**: Natural conversations for practice and guidance
- **Progress Tracking & Analytics**: Detailed insights into learning journey
- **Family Involvement Tools**: Features for parents to participate regardless of Arabic proficiency
- **Cultural Context Integration**: Content designed for Muslim families in Western countries

## 🏗️ Project Structure

```
quran-quest/
├── website/                 # React website
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS and style files
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── components/    # React Native components
│   │   ├── screens/       # Screen components
│   │   ├── navigation/    # Navigation configuration
│   │   └── utils/         # Utility functions
│   ├── ios/               # iOS specific code
│   └── android/           # Android specific code
├── backend/               # Backend services
│   ├── src/
│   │   ├── api/          # API endpoints
│   │   ├── models/       # Data models
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   └── tests/            # Backend tests
└── docs/                 # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- React Native development environment
- Python 3.8+ (for backend)

### Website Development

```bash
cd website
npm install
npm start
```

The website will be available at http://localhost:3000

### Mobile App Development

```bash
cd mobile
npm install
# For iOS
cd ios && pod install && cd ..
npx react-native run-ios
# For Android
npx react-native run-android
```

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

## 🧪 Testing

### Website

```bash
cd website
npm test
```

### Mobile App

```bash
cd mobile
npm test
```

### Backend

```bash
cd backend
python -m pytest
```

## 📱 Supported Platforms

- Web: Chrome, Firefox, Safari, Edge (latest versions)
- iOS: iOS 13+
- Android: Android 6.0 (API 23)+

## 🔒 Security

- End-to-end encryption for user data
- GDPR compliant
- Regular security audits
- Secure authentication using JWT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Support

- Website: [quranquest.com](https://quranquest.com)
- Email: support@quranquest.com
- Twitter: [@QuranQuest](https://twitter.com/QuranQuest)

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- React Native community
- Our beta testers and early adopters
- The Muslim community for their valuable feedback

## 📊 Project Status

- Website: Beta
- Mobile App: In Development
- Backend: In Development

## 🗺️ Roadmap

### Phase 1 (Q2 2024)
- Launch beta website
- Basic mobile app functionality
- Core AI features

### Phase 2 (Q3 2024)
- Advanced pronunciation feedback
- Family management features
- Enhanced progress tracking

### Phase 3 (Q4 2024)
- Community features
- Advanced AI interactions
- Multi-language support

## 💡 Technical Stack

### Frontend (Website)
- React
- TypeScript
- Tailwind CSS
- Redux

### Mobile App
- React Native
- TypeScript
- Redux
- Native Modules

### Backend
- Python
- FastAPI
- PostgreSQL
- Redis
- Docker

### AI/ML
- TensorFlow
- PyTorch
- OpenAI API
- Custom ML models

## 🌐 API Documentation

API documentation is available at [api-docs.quranquest.com](https://api-docs.quranquest.com)

## 🔄 Version History

- v0.1.0 - Initial beta release
- v0.2.0 - Added core AI features
- v0.3.0 - Enhanced mobile app functionality
