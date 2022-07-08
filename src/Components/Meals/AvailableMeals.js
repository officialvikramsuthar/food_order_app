import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItems/MealItem';
import { useEffect, useState } from 'react';

  const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(async()=>{
      const fetchMeal = async () => {
        const getFoodData = await fetch("https://reactapp-70819-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json");
        if(!getFoodData.ok){
          throw new Error("Something went wrong");
        }
        const responseData = await getFoodData.json();
        const loadedMeals = [];

        for(const key in responseData){
          const el = responseData[key];
          loadedMeals.push({
            id:key,
            name:el.name,
            description:el.description,
            price:el.price
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false)
      }

      fetchMeal().catch((error)=>{
        setIsLoading(false);
        setHttpError(error.message);
      });
    
    }, []);
    if(isLoading){
      return <section className={classes.meals}><p>Meals is loading....</p></section>
    }
    if(httpError){
      return <section className={classes.meals}><p>{httpError}</p></section>
    }
    const mealslist =  meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}>{meal.name}</MealItem>);
    return <section className={classes.meals}>
      <Card>
        <ul>
            {mealslist}
        </ul>
      </Card>
    </section>
  };

  export default AvailableMeals;