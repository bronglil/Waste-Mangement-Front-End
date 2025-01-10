# Waste Management System

## 🚀 Overview
The Waste Management System is a comprehensive solution designed to optimize waste collection and monitoring through real-time updates, driver navigation, and IoT-based bin monitoring. This modern application integrates multiple technologies to create an efficient and sustainable waste management process.

## 🏗 System Architecture
The system consists of four main components:
- **Frontend**: Vue.js application providing an intuitive user interface
- **Backend**: Spring Boot application managing business logic and APIs
- **Mobile Application**: Android app built with Kotlin and Jetpack Compose
- **IoT Integration**: Real-time bin monitoring system using IoT devices

## ✨ Key Features
- **Real-Time Monitoring**
  - Live updates of bin statuses through IoT devices
  - Instant synchronization across all platforms
  - Dashboard visualization of system metrics

- **Smart Navigation**
  - Interactive maps for bin locations
  - Optimized route planning for drivers
  - Turn-by-turn navigation system

- **Driver Dashboard**
  - Mobile-first interface for waste collectors
  - Real-time route updates and bin status
  - Collection confirmation system

- **System Integration**
  - Seamless communication between all components
  - Centralized data management
  - Automated status updates and notifications

## 🛠 Prerequisites
- **Frontend Requirements**
  - Node.js (v16 or later)
  - Yarn (v1.22 or later) or npm
  
- **Complete System Requirements**
  - Java 11 or later (for Backend)
  - Android Studio (for Mobile App)
  - IoT device configuration tools

## 📦 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/bronglil/Waste-Mangement-Front-End.git
cd Waste-Mangement-Front-End
```

2. **Install Dependencies**
```bash
# Using Yarn
yarn install

# Using npm
npm install
```

3. **Development Server**
```bash
# Using Yarn
yarn serve

# Using npm
npm run serve
```

4. **Production Build**
```bash
# Using Yarn
yarn build

# Using npm
npm run build
```

## 📚 Dependencies

### Core Dependencies
```json
{
  "@iconify/vue": "^4.1.2",
  "axios": "^1.7.7",
  "chart.js": "^4.4.7",
  "core-js": "^3.8.3",
  "leaflet": "^1.9.4",
  "vue": "^3.2.13",
  "vue-router": "^4.4.5",
  "vuex": "^4.1.0"
}
```

### Development Dependencies
```json
{
  "@babel/core": "^7.12.16",
  "@vue/cli-plugin-babel": "~5.0.0",
  "tailwindcss": "^3.4.15",
  "postcss": "^8.4.49"
}
```

## 🤝 Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Configuration
For detailed configuration options, please refer to the [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
