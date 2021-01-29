import React, { useState} from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Data from '../../services/RecipieService';
import { useStore } from '../../contextAPI/store/Provider';
import {
    notifySuccessRight,
} from '../Error_Page/Messages';
import UserServices from '../../services/UserServices';
import { setUSer } from '../../contextAPI/actions/LoginAction';
import { useHistory } from 'react-router-dom';
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

const ShowFav = ({ recipies }) => {
    const [{ user }, dispatch] = useStore('');
    const [recipiesAll, setRecipies] = useState(recipies);
    let history = useHistory();
    const removeFromFav = id => {
        const index = user.favoriteRecipes.indexOf(id);
        if (index > -1) {
            user.favoriteRecipes.splice(index, 1);
        }
        UserServices.update(user._id, user)
            .then(response => {
                dispatch(setUSer(user));
            })
            .catch(e => {
                console.log(e);
            });
        notifySuccessRight('Recipe removed from favorites!');
        getRecipes();
        if(user.favoriteRecipes.length === 0){
            history.push('/nofav');
        }
    };
    const getRecipes = () => {
        let result = [];
        user.favoriteRecipes.forEach(recipie1 => {
            Data.get(recipie1)
                .then(response => {
                    result.push(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        });
        setRecipies(result);

    };
    return (
        <div className="recipies">
            <br/>
            <br/>
            <Container>
                <Row>
                    {recipiesAll.map((recipie, index) => {
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
                                                aria-label="remove from favorites"
                                                onClick={() => {
                                                    removeFromFav(recipie._id);
                                                }}
                                            >
                                                <DeleteForeverIcon />
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

export default ShowFav;
