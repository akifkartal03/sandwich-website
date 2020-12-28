import React, { useState, useEffect } from 'react';
import RecipieDataService from '../../services/RecipieService';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { useStore } from '../../contextAPI/store/Provider';
import { notifyWarnRight,notifySuccessRight,notifyInfoRight } from '../Error_Page/Messages';
import './button.css';
import UserServices from '../../services/UserServices';
import {setUSer} from '../../contextAPI/actions/LoginAction';
import {
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Row
} from 'reactstrap';

const Recipies = () => {
    const [recipies, setRecipies] = useState([]);
    const [{ isLogged, user }, dispatch] = useStore("");
    useEffect(() => {
        retrieveRecipies();
    }, []);
    const retrieveRecipies = () => {
        RecipieDataService.getAll()
            .then(response => {
                setRecipies(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const addToFav = id => {
        if(isLogged){
            if(!checkContain(id)){
                user.favoriteRecipes.push(id);
                console.log(user._id);
                UserServices.update(user._id,user)
                .then(response => {
                    dispatch(setUSer(user));
                })
                .catch(e => {
                    console.log(e);
                });
                notifySuccessRight("Recipe added to your favorite recipes!");
            }
            else{
                notifyWarnRight("This recipe already added to favorites!");
            }
        }
        else{
            notifyInfoRight("To add favorites Sign up or Login!");
        }
    };
    const checkContain = id => {
        return user.favoriteRecipes.includes(id);
    };
    return (
        <div className="recipies">
            <Container>
                <Row>
                    {recipies.slice(12, 18).map((recipie, index) => {
                        return (
                            <Col md="4" key={index}>
                                <Card className="mb-4 box-shadow">
                                    <CardImg
                                        top
                                        width="180"
                                        height="250"
                                        src={recipie.imgURL}
                                    />
                                    <CardBody className="text-center">
                                        {/*THERE WILL AN item OBJECT IN DATABASE AND IT WILL BE PRINTED IN HERE*/}
                                        <CardText>
                                            <strong>{recipie.name}</strong>
                                        </CardText>

                                        <div className="d-flex justify-content-between">
                                            <Button
                                                href={`/recipe/${recipie._id}`}
                                                variant="outline-dark"
                                                color="secondary"
                                                size="lg"
                                                block
                                            >
                                                <strong>Show</strong>
                                            </Button>

                                            <IconButton

                                                color="secondary"
                                                aria-label="add to favorites"
                                                onClick={() => { addToFav(recipie._id) }}
                                            >
                                                <FavoriteIcon />
                                            </IconButton>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Recipies;
