import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';

export default function InfoBox({info}){
    const INIT_URL = "https://images.unsplash.com/photo-1680352267694-a7fd4c33d4e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVzdHklMjB3ZWF0aGVyfGVufDB8fDB8fHww";

    const HOT_URL = "https://images.unsplash.com/photo-1561473880-3b8b12de0a71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const RAINY_URL = "https://images.unsplash.com/photo-1536329978773-2f8ac431f330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhaW55JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";

    // Function to get weather image
    const getWeatherImage = () => {
        const weatherDesc = info.weather.toLowerCase();
        
        // Debug: log the weather description and temperature
        console.log("Weather Description:", weatherDesc);
        console.log("Temperature:", info.temp);
        console.log("Humidity:", info.humidity);
        
        // Check for rain first (highest priority)
        if (weatherDesc.includes('rain') || weatherDesc.includes('drizzle') || weatherDesc.includes('shower') || weatherDesc.includes('storm') || info.humidity > 85) {
            console.log("Selected: RAINY_URL");
            return RAINY_URL;
        }
        // Check for very hot weather first (>30°C)
        else if (info.temp > 30) {
            console.log("Selected: HOT_URL (temp > 30)");
            return HOT_URL;
        }
        // Check for cold weather
        else if (info.temp < 15) {
            console.log("Selected: COLD_URL (temp < 15)");
            return COLD_URL;
        }
        // Check for clear/sunny weather
        else if (weatherDesc.includes('clear') || weatherDesc.includes('sunny')) {
            console.log("Selected: HOT_URL (clear/sunny)");
            return HOT_URL;
        }
        // Check for cloudy weather (after temperature and clear weather checks)
        else if (weatherDesc.includes('cloud') || weatherDesc.includes('overcast')) {
            console.log("Selected: INIT_URL (cloudy)");
            return INIT_URL; // cloudy/dusty weather
        }
        // For moderate temperatures (15-30°C), default to hot
        else if (info.temp >= 15 && info.temp <= 30) {
            console.log("Selected: HOT_URL (moderate temp)");
            return HOT_URL;
        }
        else {
            console.log("Selected: INIT_URL (default)");
            return INIT_URL; // default for mild weather
        }
    };

    // Function to get weather icon
    const getWeatherIcon = () => {
        const weatherDesc = info.weather.toLowerCase();
        
        // Check for rain first (highest priority)
        if (weatherDesc.includes('rain') || weatherDesc.includes('drizzle') || weatherDesc.includes('shower') || weatherDesc.includes('storm') || info.humidity > 85) {
            return <ThunderstormIcon sx={{ fontSize: 40, color: 'black' }} />;
        }
        // Check for cold weather
        else if (info.temp < 15) {
            return <AcUnitIcon sx={{ fontSize: 40, color: 'black' }} />;
        }
        // Check for hot weather or sunny conditions
        else if (info.temp > 30 || weatherDesc.includes('clear') || weatherDesc.includes('sunny')) {
            return <SunnyIcon sx={{ fontSize: 40, color: 'black' }} />;
        }
        // For moderate temperatures (15-30°C), default to sunny
        else if (info.temp >= 15 && info.temp <= 30) {
            return <SunnyIcon sx={{ fontSize: 40, color: 'black' }} />;
        }
        else {
            // Default icon for cloudy/overcast weather
            return <SunnyIcon sx={{ fontSize: 40, color: 'black' }} />;
        }
    };

    return(
        <div className="InfoBox">
            <div className='cardContainer'>
             <Card sx={{ 
                maxWidth: 400, 
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
                }
             }}>
      <CardMedia
        sx={{ 
            height: 180,
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)'
            }
        }}
        image={getWeatherImage()}
        title="weather conditions"
      />
      <CardContent sx={{ padding: '24px' }}>
        <Typography 
            gutterBottom 
            variant="h4" 
            component="div" 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 2,
                marginBottom: 3,
                fontWeight: 700,
                color: '#2c3e50',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
        >
         {info.city}
         <Box sx={{ 
            animation: 'bounce 2s ease-in-out infinite',
            '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-8px)' }
            }
         }}>
            {getWeatherIcon()}
         </Box>
        </Typography>
        
        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 2, 
            marginBottom: 3 
        }}>
            <Box sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}>
                <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 1 }}>
                    {info.temp}°C
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Current Temperature
                </Typography>
            </Box>
            
            <Box sx={{ 
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)'
            }}>
                <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 1 }}>
                    {info.humidity}%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Humidity
                </Typography>
            </Box>
        </Box>
        
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: 3,
            gap: 1
        }}>
            <Chip 
                label={`Min: ${info.tempMin}°C`} 
                sx={{ 
                    background: 'linear-gradient(45deg, #3498db, #2980b9)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    padding: '8px 4px',
                    '& .MuiChip-label': { padding: '0 12px' }
                }} 
            />
            <Chip 
                label={`Max: ${info.tempMax}°C`} 
                sx={{ 
                    background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    padding: '8px 4px',
                    '& .MuiChip-label': { padding: '0 12px' }
                }} 
            />
        </Box>
        
        <Box sx={{ 
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)'
        }}>
            <Typography variant="body1" sx={{ 
                color: '#8b4513',
                fontWeight: 600,
                lineHeight: 1.6
            }}>
                The weather can be described as <strong style={{ color: '#d2691e' }}>{info.weather}</strong> and feels like <strong style={{ color: '#d2691e' }}>{info.feelsLike}°C</strong>
            </Typography>
        </Box>
      </CardContent>
    </Card>
    </div>
        </div>
    )
}