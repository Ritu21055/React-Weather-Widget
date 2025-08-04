import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;



  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonResponse = await response.json();
      
      const result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      
      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
    if (error) setError(false);
  };

  const handleSubmit = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    try {
      setLoading(true);
      setError(false);
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (err) {
      setError(true);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
      <Card 
        sx={{ 
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: 'white'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ mb: 2 }}
          >
            Search for weather information
          </Typography>

          {/* Search Input */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              id="city"
              label="City Name"
              variant="outlined"
              required
              value={city}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              error={error}
              disabled={loading}
              size="small"
              fullWidth
              InputProps={{
                endAdornment: loading && (
                  <CircularProgress size={20} />
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                No such place exists! Please try again.
              </Alert>
            )}

            {/* Search Button */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !city.trim()}
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} color="inherit" />
                  SEARCHING...
                </Box>
              ) : (
                'SEARCH'
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}