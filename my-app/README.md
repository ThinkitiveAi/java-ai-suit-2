# Sample EMR - Healthcare Provider Dashboard

A professional healthcare provider management system built with React and React Router DOM.

## 🏥 Features

### Authentication & User Management

- **Provider Login**: Secure login with email/phone and password
- **Provider Registration**: Complete registration form with validation
- **Forgot Password**: Password reset functionality
- **Remember Me**: Session persistence option

### Professional UI/UX

- **Medical Theme**: Professional blue (#2563eb) and green (#059669) color scheme
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG compliant with focus management and high contrast support
- **Loading States**: Smooth animations and loading indicators
- **Form Validation**: Real-time validation with error feedback

### Navigation & Routing

- **React Router DOM**: Client-side routing with URL navigation
- **Protected Routes**: Dashboard access after authentication
- **Success Messages**: Cross-page communication with state management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sample-emr
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Routes

- **`/`** → Redirects to login page
- **`/login`** → Provider login interface
- **`/register`** → Provider registration form
- **`/forgot-password`** → Password reset page
- **`/dashboard`** → Main dashboard (requires authentication)
- **`/privacy`** → Privacy policy page
- **`/terms`** → Terms of service page
- **`/support`** → Support page

## 🎨 Design System

### Colors

- **Primary Blue**: `#2563eb` - Main brand color
- **Secondary Green**: `#059669` - Success and medical theme
- **Background**: `#f8fafc` - Light gradient background
- **Text**: `#1e293b` - Dark text for readability

### Typography

- **Font Family**: Roboto (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately across devices

### Components

- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Icons**: Medical-themed SVG icons

## 🔧 Technical Stack

- **Frontend**: React 18
- **Routing**: React Router DOM v7
- **Styling**: CSS3 with custom properties
- **Icons**: SVG icons with medical theme
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── ProviderLogin.js          # Login component
│   ├── ProviderLogin.css         # Login styles
│   ├── ProviderRegistration.js   # Registration component
│   ├── ProviderRegistration.css  # Registration styles
│   ├── ForgotPassword.js         # Password reset component
│   ├── ForgotPassword.css        # Password reset styles
│   ├── Dashboard.js              # Dashboard component
│   └── Dashboard.css             # Dashboard styles
├── App.js                        # Main app with routing
├── App.css                       # Global styles
└── index.js                      # App entry point

public/
├── index.html                    # HTML template
├── favicon.ico                   # App favicon
├── favicon.svg                   # SVG favicon
├── site.webmanifest             # PWA manifest
└── favicon-generator.html       # Favicon generator tool
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📦 Building for Production

Create a production build:

```bash
npm run build
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Clear focus indicators

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team

---

**Sample EMR** - Professional Healthcare Provider Management System
