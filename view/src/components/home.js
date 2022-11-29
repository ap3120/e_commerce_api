import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '../App.css';
import {Link} from 'react-router-dom';

export const Home = () => {
    return (
        <div sx={{display: 'flex', flexDirection: 'column'}}>
            <h1>Go for freedom, reliability and security with our range of products.</h1>
            <div className='products-cards-container'>
                <Card sx={{ width: 400, height: 550, textAlign: 'center', margin: 5}}>
                    <CardActionArea sx={{height: 500}}>
                        <img src={require('../images/hp-omen-x-laptop.webp')} width={400} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Laptops
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Our laptops ...
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link to='/laptops' className='navlink'>
                            <Button size="small" color="primary">
                                View laptops
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
                <Card sx={{ width: 400, height: 550, textAlign: 'center', margin: 5}}>
                    <CardActionArea sx={{height: 500}}>
                        <img src={require('../images/samsung-a-20-e.jpeg')} width={400} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Smartphones
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Our smartphones ...
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link to='/smartphones' className='navlink'>
                            <Button size="small" color="primary">
                                View smartphones
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
                <Card sx={{ width: 400, height: 550, textAlign: 'center', margin: 5}}>
                    <CardActionArea sx={{height: 500}}>
                        <img src={require('../images/sandisk-usb.jpeg')} width={400} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Accessories
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Our accessories ...
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link to='/accessories' className='navlink'>
                            <Button size="small" color="primary">
                                View accessories
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
