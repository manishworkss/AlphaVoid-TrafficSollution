import React, { useState } from 'react';
import { Navigation, Clock, MapPin, Search, User, Lock, Mail, LogOut, Menu, X, Zap, TrendingDown } from 'lucide-react';

const SmartTrafficNavigator = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showRoutes, setShowRoutes] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const locations = [
    "Parul University", "Uma Circle", "Sayajigunj", "Alkapuri", 
    "Manjalpur", "Fatehgunj", "Akota", "Waghodia", "Sama",
    "Karelibaug", "VIP Road", "Productivity Road", "Railway Station",
    "Airport", "Inox", "Celebration Mall", "Race Course"
  ];

  const getRoutes = (from, to) => {
    return [
      {
        id: 1,
        name: "Shortest Path",
        distance: 17,
        estimatedTime: 29,
        actualTime: 45,
        color: "#EF4444",
        signals: [
          { name: "Waghodia Signal", timeLeft: 35, currentPhase: "red" },
          { name: "Sama Bridge Signal", timeLeft: 20, currentPhase: "red" },
          { name: "Productivity Road Signal", timeLeft: 40, currentPhase: "green" },
          { name: "Karelibaug Signal", timeLeft: 50, currentPhase: "red" }
        ],
        congestionLevel: "High",
        congestionPercentage: 85,
        pathCoordinates: [[20, 30], [40, 50], [60, 70], [80, 90]]
      },
      {
        id: 2,
        name: "Medium Path",
        distance: 24,
        estimatedTime: 36,
        actualTime: 38,
        color: "#F59E0B",
        signals: [
          { name: "Manjalpur Signal", timeLeft: 25, currentPhase: "green" },
          { name: "Fatehgunj Signal", timeLeft: 35, currentPhase: "green" },
          { name: "Alkapuri Signal", timeLeft: 15, currentPhase: "red" }
        ],
        congestionLevel: "Medium",
        congestionPercentage: 55,
        pathCoordinates: [[20, 30], [50, 40], [70, 60], [80, 90]]
      },
      {
        id: 3,
        name: "Longest Path (Recommended)",
        distance: 27,
        estimatedTime: 42,
        actualTime: 32,
        color: "#10B981",
        signals: [
          { name: "VIP Road Signal", timeLeft: 55, currentPhase: "green" },
          { name: "Akota Signal", timeLeft: 45, currentPhase: "green" }
        ],
        congestionLevel: "Low",
        congestionPercentage: 25,
        pathCoordinates: [[20, 30], [30, 60], [60, 80], [80, 90]]
      }
    ];
  };

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setUser({ name: loginEmail.split('@')[0], email: loginEmail });
      setIsLoggedIn(true);
      setCurrentPage('map');
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleSignup = () => {
    if (signupName && signupEmail && signupPassword) {
      setUser({ name: signupName, email: signupEmail });
      setIsLoggedIn(true);
      setCurrentPage('map');
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('login');
    setShowRoutes(false);
    setSelectedRoute(null);
  };

  const handleSearch = () => {
    if (searchFrom && searchTo) {
      const routes = getRoutes(searchFrom, searchTo);
      setShowRoutes(true);
      setShowSearchPopup(false);
    }
  };

  const getRecommendedRoute = () => {
    if (!showRoutes) return null;
    const routes = getRoutes(searchFrom, searchTo);
    return routes.reduce((prev, current) => 
      prev.actualTime < current.actualTime ? prev : current
    );
};
if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Smart Navigator</h1>
            <p className="text-gray-600 mt-2">Your Intelligent Route Companion</p>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('signup')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Join Smart Navigator Today</p>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <button
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Navigation size={28} />
            <h1 className="text-2xl font-bold">Smart Navigator</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <User size={20} />
              <span className="font-semibold">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setShowSearchPopup(true)}
            className="w-full bg-white border-2 border-gray-300 rounded-full px-6 py-4 flex items-center gap-3 hover:border-blue-500 hover:shadow-lg transition"
          >
            <Search className="text-gray-400" size={24} />
            <span className="text-gray-600 font-medium">
              {showRoutes ? `${searchFrom} → ${searchTo}` : 'Where do you want to go?'}
            </span>
          </button>
        </div>
      </div>

      <div className="relative h-[calc(100vh-200px)]">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {showRoutes && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl mx-auto p-8">
                <div className="absolute left-20 top-20 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg z-10">
                  📍 {searchFrom}
                </div>

                <div className="absolute right-20 bottom-20 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg z-10">
                  🎯 {searchTo}
                </div>

                {getRoutes(searchFrom, searchTo).map((route, idx) => (
                  <svg
                    key={route.id}
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: selectedRoute?.id === route.id ? 5 : 1 }}
                  >
                    <path
                      d={`M 150 150 Q ${200 + idx * 50} ${200 + idx * 30} 600 600`}
                      stroke={route.color}
                      strokeWidth={selectedRoute?.id === route.id ? "8" : "4"}
                      fill="none"
                      strokeDasharray={route.congestionLevel === "High" ? "10,5" : "none"}
                      opacity={selectedRoute && selectedRoute.id !== route.id ? "0.3" : "1"}
                    />
                  </svg>
                ))}

                {selectedRoute && selectedRoute.signals.map((signal, idx) => (
                  <div
                    key={idx}
                    className="absolute bg-white rounded-lg shadow-lg p-3 border-2 border-gray-200"
                    style={{
                      left: `${30 + idx * 15}%`,
                      top: `${40 + idx * 10}%`,
                      zIndex: 10
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${signal.currentPhase === 'red' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                      <div>
                        <p className="font-semibold text-xs">{signal.name}</p>
                        <p className="text-xs text-gray-600">{signal.timeLeft}s</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showRoutes && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={64} className="text-gray-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-gray-600">Click search to find your route</p>
              </div>
            </div>
          )}
        </div>

        {showRoutes && (
          <div className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl p-6 max-h-80 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Available Routes</h2>
            
            {getRecommendedRoute() && (
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="text-yellow-600" size={24} />
                  <div>
                    <p className="font-bold text-gray-800">⚡ Smart Recommendation</p>
                    <p className="text-sm text-gray-700">
                      Take <strong>{getRecommendedRoute().name}</strong> - Save {getRoutes(searchFrom, searchTo)[0].actualTime - getRecommendedRoute().actualTime} minutes!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {getRoutes(searchFrom, searchTo).map((route) => (
                <div
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    selectedRoute?.id === route.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-400'
                  } ${route.id === getRecommendedRoute()?.id ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  {route.id === getRecommendedRoute()?.id && (
                    <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">
                      ⭐ BEST
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-2">{route.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Distance:</strong> {route.distance} km</p>
                    <p><strong>Time:</strong> <span className="text-lg font-bold text-blue-600">{route.actualTime} min</span></p>
                    <p><strong>Signals:</strong> {route.signals.length}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-3 h-3 rounded-full ${
                        route.congestionLevel === 'High' ? 'bg-red-500' :
                        route.congestionLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <span className="text-xs">{route.congestionLevel} Traffic</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSearchPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Plan Your Route</h2>
              <button
                onClick={() => setShowSearchPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">From</label>
                <select
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select starting point</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">To</label>
                <select
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select destination</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSearch}
                disabled={!searchFrom || !searchTo}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search Routes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartTrafficNavigator;