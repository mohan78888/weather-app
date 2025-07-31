# MyWeather Pro 🌤️

A sleek, professional weather web application with a beautiful dark theme built using HTML, Tailwind CSS, and JavaScript.

## ✨ Features

- **🌙 Dark Theme UI** - Modern, professional dark interface
- **🔍 City Search** - Search for any city worldwide
- **📊 Current Weather** - Real-time temperature and conditions
- **📅 3-Day Forecast** - Detailed weather predictions
- **⚠️ Smart Alerts** - Rain warnings and storm notifications
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Smooth Animations** - Beautiful transitions and effects

## 🚀 Quick Start

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Start searching** for cities!

The app works immediately with mock data. No setup required!

## 🔧 API Integration (Optional)

To use real weather data from OpenWeatherMap:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `script.js`
3. Replace `'YOUR_API_KEY'` on line 3 with your actual API key:

```javascript
this.apiKey = 'your_actual_api_key_here';
```

## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🎨 Design Features

- **Header**: App branding with weather icon
- **Search Bar**: Rounded input with search button
- **Current Weather Card**: Large temperature display with conditions
- **Forecast Grid**: 3-day forecast in responsive cards
- **Alert Banner**: Dynamic warnings for rain/storms
- **Footer**: Social links and branding

## 🎯 UI Components

### Current Weather Display
- City name and current date
- Large temperature reading
- Weather condition icon
- Description text

### Forecast Cards
- Day of the week
- Temperature
- Weather icon
- Condition description

### Alert System
- Yellow warning banner for rain
- Storm warnings for thunderstorms
- Dynamic message updates

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📱 Responsive Breakpoints

- **Mobile**: Single column layout
- **Tablet**: Responsive grid adjustments
- **Desktop**: Full layout with side-by-side elements

## 🎨 Customization

### Colors
The app uses a custom Tailwind color palette:
- `dark-bg`: #0f172a (Background)
- `card-bg`: #1e293b (Card backgrounds)
- `accent`: #3b82f6 (Primary blue)
- `warning`: #f59e0b (Alert yellow)
- `danger`: #ef4444 (Error red)

### Styling
All styling is done with Tailwind CSS classes. Modify the HTML classes to customize the appearance.

## 🔮 Future Enhancements

- [ ] Hourly forecast
- [ ] Weather maps
- [ ] Multiple city favorites
- [ ] Weather history
- [ ] More detailed alerts
- [ ] Location-based weather
- [ ] Weather widgets

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using HTML, Tailwind CSS, and JavaScript** 