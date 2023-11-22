import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { History } from 'history';
import moment from 'moment';
import { Component } from 'react';
import { EatFoodDto, FoodHistoryDto, MealDto } from '../../apis/dtos/serverDtos';
import { QuantityCell } from '../dashboard/pages/foodstock_page/components';
import { EatMealCell } from '../dashboard/pages/foodstock_page/meals/meals_components';
// interface StylesProps extends WithStyles<typeof styles> { };
type MainProps = {
  imageBytes: any;
  name: string;
  meal?: MealDto;
  foodHistory?: FoodHistoryDto;
  editMeal?: (mealDto: MealDto, mealImage?: any) => any;
  eatMeal?: (eatMealDto: EatFoodDto) => any;
  history: History;
  locationPath: String;
}
type FoodCardProps = MainProps;// & StylesProps;
type FoodCardState = {};
class FoodCard extends Component<FoodCardProps, FoodCardState> {
  classes: any;

  defineImageSource = () => {
    let imageBytes = this.props.imageBytes;
    return URL.createObjectURL(imageBytes);
    // return `data:image/jpeg;base64, ${imageBytes}`;
  }

  render() {
    return (
      <Card sx={{maxWidth: 160}}>
        <CardActionArea onClick={() => {
          if(this.props.meal) this.props.history.push(`${this.props.locationPath}/meal/${this.props.meal.id}`);
        }}>
          <CardMedia
            component="img"
            sx={{height: 150}}
            src={this.props.imageBytes ? this.defineImageSource() : ""}
          />
          <CardContent>
            <Typography variant="h6" style={{ fontSize: 18 }}>
              {this.props.name}
            </Typography>

          </CardContent>
        </CardActionArea>


        <CardActions>

          {this.props.meal ? (
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>

              <Grid item>
                <EatMealCell
                  value={this.props.meal}
                  onPrepare={() => this.props.editMeal({ id: this.props.meal.id, quantityLeft: this.props.meal.quantity })}
                  onEat={(eatMealDto) => this.props.eatMeal(eatMealDto)}

                />
              </Grid>
              <Grid item>
                <QuantityCell
                  hasEditMode={false}
                  foodItem={{ quantity: this.props.meal.quantityLeft, servingSize: this.props.meal.quantity / this.props.meal.servings }}
                  emptyContents={() => this.props.editMeal({ id: this.props.meal.id, quantityLeft: 0 })}
                  mealQuantity={this.props.meal.quantity}
                />
              </Grid>
            </Grid>

          ) :
            (
              <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                  {this.props.foodHistory.quantity} g 
                </Grid>
                <Grid item>
                  {moment(this.props.foodHistory.date).format('DD-MM-YYYY HH:mm:ss')}
                </Grid>
              </Grid>
            )
          }
        </CardActions>

      </Card >
    );
  }
}
export default FoodCard;
