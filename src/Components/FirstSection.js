import React, { useState, useEffect } from 'react';
import { Autocomplete, Button, FormControl, Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { GetAllServices } from '../Store/Actions/Dashboard/servicesAction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { useService } from '../Store/context/serviceProvider';
const FirstSection = () => {
    const navigate = useNavigate();
    // State to track the selected location
    const [location, setLocation] = useState([]);
    const [allLocation, setAllLocation] = useState([]);
    const { setItems } = useService();
    const [services, setAllServices]=useState({})
    const [selectedService, setSelectedService] = useState('')
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const { data } = useSelector(state => state.GetAllServicesReducer)

    const dispatch = useDispatch()  
  
    useEffect(() => {
      dispatch(GetAllServices());
    }, [dispatch]);

useEffect(() => {
    if (data && data.data) {
        const transformedData = data.data.map(item => ({
            label: item.serviceName,
            value: item.id
        }));
        setAllServices(transformedData);
    }
}, [data]);


useEffect(() => {
  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/location-listing`);
      if (response.data.status === true) {
        setAllLocation(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  fetchLocations();
}, []);

const SearchService = () => {
  setItems(selectedService.value)
  navigate('/ServicePage')
  // navigate(`/ServicePage?serviceName=${selectedService.label}`,);
};




    return (
        <>
            <div className="animate__animated animate__backInLeft" style={{ height: '500px', display: 'grid', placeItems: 'center' }}>
                <div>
                    <h1 className='FirstSectionHeadinng'>Home services, on demand. 👇</h1>

                    <Grid container bgcolor={'#fff'} className='rounded' spacing={0}>
                        <Grid item xs={12} sm={4} md={6} lg={3} xl={3}>
                            <Select
                                fullWidth
                                value={location}
                                onChange={handleLocationChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Location' }}
                                sx={{ borderRadius: '6px 0px 0px 6px' }}
                            >
                                <MenuItem value="" disabled>
                                    Select Location
                                </MenuItem>
                                {
                                allLocation && allLocation.length > 0 ? (
                                  allLocation.map((item) => (
                                    <MenuItem key={item.location_name} value={item.location_name}>
                                      {item.location_name}
                                    </MenuItem>
                                  ))
                                ) : (
                                  <MenuItem disabled>No locations available</MenuItem>
                                )
                              }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} lg={9} xl={9} >
                        <Autocomplete
                        disablePortal
                        sx={{ borderRadius: '0px 6px 6px 0px' }}
                        options={services}
                        onChange={(event, value) => setSelectedService(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{ borderRadius: '0px 6px 6px 0px' }}
                                placeholder='Select or Type Service Name'
                            />
                        )}
                    />
                        </Grid>
                    </Grid>

                    <div className="text-center mt-2">
                        <Button sx={{ color: '#eedc30' }} variant='contained' onClick={SearchService}>Search Now</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FirstSection;
