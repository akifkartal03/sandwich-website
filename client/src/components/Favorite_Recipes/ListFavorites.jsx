import React, { useEffect, useState, Component,Suspense } from 'react';
import RecipieDataService from '../../services/RecipieService';
import ShowResults from '../AllRecipesPage/ShowRecipies';
import './cont.css';
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
/*const ListRecipies = ({ recipies }) => {
    const [rec, setData] = useState([]);
    useEffect(() => {
       getData();
    }, []);
    async function getData() {
        let result = [];
        recipies.map(recipie1 => {
            RecipieDataService.get(recipie1)
                .then(response => {
                    result.push(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        });
       setData(result);
    }
    return (
        <div className="container">
            <Container className="myContainer">
                <Row className="row">
                    {rec.map((recipie, index) => {
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

                                        <CardText className="cardText">
                                            <strong className="strong">
                                                {recipie.name}
                                            </strong>
                                        </CardText>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button
                                                className="showButton"
                                                href={`/recipe/${recipie._id}`}
                                                variant="outline-dark"
                                                color="secondary"
                                                size="lg"
                                                block
                                            >
                                                <strong>Show</strong>
                                            </Button>
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

export default ListRecipies;*/
class ListFav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            isget: false
        };
    }
    retrieveRecipes = () => {
        this.props.recipies.map(recipie1 => {
            RecipieDataService.get(recipie1)
                .then(response => {
                    this.state.recipes.push(response.data);
                    this.setState({ recipes: this.state.recipes, isget: true });
                })
                .catch(e => {
                    console.log(e);
                });
        });
        this.setState({ isget: true });
    };
    componentDidMount() {
        this.retrieveRecipes();
        console.log(this.state.isget);
        console.log(this.state.recipes);
    }
    render() {
        return (
            <div className="container">
                <Suspense fallback={<h1>Loading recipes...</h1>}>
                    <br/><br/><ShowResults recipies={this.state.recipes} />
                </Suspense>

            </div>
        );
    }
}
export default ListFav;
