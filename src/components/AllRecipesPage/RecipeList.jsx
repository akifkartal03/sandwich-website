import React, { useState, useEffect } from 'react';
import Recipies from './ShowRecipies';
import RecipieDataService from '../../services/RecipieService';
const RecipieList = ({ categories }) => {
  const [recipies, setRecipies] = useState([]);

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
    return (
        <div className="col-lg-9">
            <div className="row">
                <div className="col-30">
                    <Recipies recipies={recipies} />
                </div>
            </div>
        </div>
    );
};
export default RecipieList;
