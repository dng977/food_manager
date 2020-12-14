import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, Label, LabelList, Legend, Tooltip, BarChart, CartesianGrid, YAxis, Bar, XAxis, ReferenceLine, CartesianAxis,
} from 'recharts';
import { macronutrient, MacroNutrient, MicroNutrient } from './objects';
import _ from 'lodash';
import { Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader, makeStyles, Paper, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';

export default class NutritionPieChart extends React.Component {

  constructor(props) {
    super(props);
    this.pieRadius = 160;
    this.pieChartHeight = this.pieRadius * 2 + 30;
    this.pieChartWidth = this.pieRadius * 2 + 50;
    this.animationDuration = 500;
  }

  getData = () => {
    let data = [];
    if (!_.isEmpty(this.props.nutritionRda) && !_.isEmpty(this.props.macroState)) {
      data = [
        new MacroNutrient({
          label: macronutrient.carb,
          lowerLimit: this.props.nutritionRda.carbLLimit,
          upperLimit: this.props.nutritionRda.carbULimit,
          // gramsRDA: this.props.nutritionRda.carbohydrates_g,
          gramsEaten: this.props.macroState.carbohydrates_g,
          maxEnergy: this.props.nutritionRda.energy_kcal,
          color: { colorEaten: '#00695c', colorRemaining: '#e0f2f1' },
        }),
        new MacroNutrient({
          label: macronutrient.protein,
          lowerLimit: this.props.nutritionRda.proteinLLimit,
          upperLimit: this.props.nutritionRda.proteinULimit,
          // gramsRDA: this.props.nutritionRda.protein_g,
          gramsEaten: this.props.macroState.protein_g,
          maxEnergy: this.props.nutritionRda.energy_kcal,
          color: { colorEaten: '#1565c0', colorRemaining: '#e3f2fd' },
        }),
        new MacroNutrient({
          render: false,
          label: macronutrient.fat,
          lowerLimit: this.props.nutritionRda.fatLLimit,
          upperLimit: this.props.nutritionRda.fatULimit,
          gramsEaten: this.props.macroState.fat_g,
          maxEnergy: this.props.nutritionRda.energy_kcal,
          subNutrients: [
            new MacroNutrient({
              label: macronutrient.monoFat,
              lowerLimit: this.props.nutritionRda.monoFatLLimit,
              upperLimit: this.props.nutritionRda.monoFatULimit,
              gramsEaten: this.props.macroState.monoFat_g,
              maxEnergy: this.props.nutritionRda.energy_kcal,
              color: { colorEaten: '#6a1b9a', colorRemaining: '#f3e5f5' },
            }),
            new MacroNutrient({
              label: macronutrient.polyFat,
              lowerLimit: this.props.nutritionRda.polyFatLLimit,
              upperLimit: this.props.nutritionRda.polyFatULimit,
              gramsEaten: this.props.macroState.polyFat_g,
              maxEnergy: this.props.nutritionRda.energy_kcal,
              color: { colorEaten: '#4527a0', colorRemaining: '#ede7f6' },
              subNutrients: [
                new MacroNutrient({
                  render: false,
                  label: macronutrient.omega3,
                  lowerLimit: this.props.nutritionRda.omega3LLimit,
                  upperLimit: this.props.nutritionRda.omega3ULimit,
                  gramsRDA: this.props.nutritionRda.omega3_g,
                  gramsEaten: this.props.macroState.omega3_g,
                  maxEnergy: this.props.nutritionRda.energy_kcal,
                }),
                new MacroNutrient({
                  render: false,
                  label: macronutrient.omega6,
                  lowerLimit: this.props.nutritionRda.omega6LLimit,
                  upperLimit: this.props.nutritionRda.omega6ULimit,
                  gramsRDA: this.props.nutritionRda.omega6_g,
                  gramsEaten: this.props.macroState.omega6_g,
                  maxEnergy: this.props.nutritionRda.energy_kcal,
                }),
              ]
            }),
            new MacroNutrient({
              label: macronutrient.satFat,
              lowerLimit: this.props.nutritionRda.satFatLLimit,
              upperLimit: this.props.nutritionRda.satFatULimit,
              gramsEaten: this.props.macroState.satFat_g,
              maxEnergy: this.props.nutritionRda.energy_kcal,
              color: { colorEaten: '#283593', colorRemaining: '#e8eaf6' },
            }),
          ],
        }),
        new MacroNutrient({
          render: false,
          label: macronutrient.water,
          gramsRDA: this.props.nutritionRda.water_g,
          gramsEaten: this.props.macroState.water_g,
        }),
        new MacroNutrient({
          render: false,
          label: macronutrient.fiber,
          gramsRDA: this.props.nutritionRda.fiber_g,
          gramsEaten: this.props.macroState.fiber_g,
        }),
      ];
    }
    return data;
  }

  flatMapRenderData = data => {
    return data.flatMap((nutrient) => {
      let list = [];
      if (nutrient.render) {
        list.push(nutrient);
      }
      if (nutrient.subNutrients.length) {
        let subnuts = (this.flatMapRenderData(nutrient.subNutrients));
        list = list.concat(subnuts);
      }
      return list;
    })
  }
  getDataToRender = (data) => {
    let dataToRender = this.flatMapRenderData(data);
    console.log("dttorender", dataToRender)
    this.calculateAngles(dataToRender, 0, -3);
    return dataToRender;
  }


  calculateSecondSectorCals = (data) => {
    let percentageMinAmountSectors = 0;
    let secondSectorCalsEaten = 0;
    data.forEach(nutrient => {
      percentageMinAmountSectors += nutrient.minAmountPercentage;
      console.log(nutrient.calsEatenBySector);
      secondSectorCalsEaten += nutrient.calsEatenBySector[ 1 ];
    });
    let secondSectorTotalCals = (1 - percentageMinAmountSectors) * this.props.nutritionRda.energy_kcal;
    return [ secondSectorCalsEaten, secondSectorTotalCals ];
  }


  calculateAngles = (data, start, start2, energyConsumed) => {
    const [ secondSectorCalsEaten, secondSectorTotalCals ] = this.calculateSecondSectorCals(data);
    //CHECK IF SECOND SECTOR IS FULL
    if (secondSectorCalsEaten > secondSectorTotalCals) {
      data.forEach((nutrient) => {
        if (nutrient.calsEatenBySector[ 1 ] > 0) {
          nutrient.freeSectorPercentage = ((nutrient.calsEatenBySector[ 1 ] / secondSectorCalsEaten) * secondSectorTotalCals) / this.props.nutritionRda.energy_kcal;

        }
      })

    }

    const angleReducer = (acc, cur, idx) => {

      let paddingAngle = idx === data.length - 1 ? 3 : 2;
      //CALCULATE ANGLES
      cur.startAngle[ 0 ] = acc[ 0 ];
      cur.setEndAngle(0, paddingAngle);

      if (cur.calsEatenBySector[ 1 ] > 0) {
        cur.startAngle[ 1 ] = acc[ 1 ];
        cur.setEndAngle(1, paddingAngle);

      }

      return [ cur.minAmountPercentage * 360 + acc[ 0 ], acc[ 1 ] - cur.freeSectorPercentage * 360 ];
    };

    data.reduce(angleReducer, [ start, start2 ]);

  }

  renderCells = (data) => {
    return data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
  }

  renderPie = (object) => {
    let minimumCalsExceeded = object.calsEatenBySector[ 1 ] > 0;
    let pie1 =
      <Pie
        key={`pie-${object.label}`}
        data={[ { name: `${object.label}-rem`, value: object.calsRemainingBySector[ 0 ] }, { name: object.label, value: object.calsEatenBySector[ 0 ] } ]}
        cx='50%'
        cy='50%'
        labelLine={false}
        stroke={5}
        dataKey="value"
        animationDuration={this.animationDuration}
        startAngle={object.startAngle[ 0 ]}
        endAngle={object.endAngle[ 0 ]}
      >
        {/* style={{textDecoration: minimumCalsExceeded ? 'line-through': 'none'}} */}
        <Label offset={10} position="outside" key='label' fill={object.colorEaten}>
          {!minimumCalsExceeded ?
            // `${parseInt(object.gramsEaten, 10)} / ${parseInt(object.minGrams)} g`
            `${parseInt(object.gramsEaten / object.minGrams * 100, 10)} %`
            :
            `${parseInt(object.minGrams, 10)}g  ✓`
          }
        </Label>

        <Cell key={`cell-${object.label}`} fill={object.colorRemaining} />
        <Cell key={`cell-${object.label}2`} fill={object.colorEaten} stroke="grey" strokeWidth="1" />
      </Pie>
      ;
    if (minimumCalsExceeded) {
      let pie2 = (
        <Pie
          key={`pie-${object.label}-2`}
          data={[ { name: object.label, value: object.calsEatenBySector[ 1 ] } ]}
          cx='50%'
          cy='50%'
          labelLine={false}
          dataKey="value"
          animationDuration={this.animationDuration}
          startAngle={object.startAngle[ 1 ]}
          endAngle={object.endAngle[ 1 ]}
        >
          {/* <Label position="outside" key='label' fill={object.colorEaten}>{object.label} 2</Label> */}
          {/* <Cell key={`cell-${object.label}-2`} fill={object.colorRemaining} /> */}
          <Cell key={`cell-${object.label}2-2`} fill={object.colorEaten} stroke="grey" strokeWidth="1" />
        </Pie>
      );
      return [ pie1, pie2 ];
    }

    return pie1;
  }

  renderPies = (data) => {
    if (data)
      return data.map(object => this.renderPie(object));
  }

  renderLegendItem = (object) => {
    let minimumCalsExceeded = object.totalCalsEaten > object.minCals;
    return (
      <div key={object.label}>
        <ListItem >
          {object.render ?
            <PieChartRoundedIcon style={{ color: object.colorEaten }} />
            : null}
          <ListItemText>
            <Typography style={{ color: object.colorEaten, fontWeight: "bold" }} variant="caption">{`${object.subNutrients.length ? "Total" : ""} ${object.label} : `}</Typography>

            <Typography style={{ color: object.maxGrams && object.gramsEaten > object.maxGrams ? "red" : "none", fontWeight: "bold" }} variant="caption">
              {`${Number(object.gramsEaten).toFixed(2)}g  `}</Typography>
            {/* {object.maxGrams ?  */}
            <Typography style={{ color: object.maxGrams && object.gramsEaten > object.maxGrams ? "red" : "none" }} variant="caption">
              {!object.maxGrams || object.gramsEaten < object.minGrams ?
                ` / ${Number(object.minGrams).toFixed(2)} g (min)`
                : object.gramsEaten < object.maxGrams ?
                  ` < ${Number(object.maxGrams).toFixed(2)} g (max) `
                  : "! "

              }
            </Typography>
            <Typography style={{ color: object.colorEaten, fontWeight: "bold" }} variant="caption">
              {minimumCalsExceeded ? "✓" : ""}
            </Typography>

          </ListItemText>
        </ListItem>
        {
          object.subNutrients.length ?
            <div key={object.label}>
              <Divider key={object.label + "divider"} />
              <ListItem key={object.label + "2"}>
                {this.renderLegend(object.subNutrients)}</ListItem>
            </div> : null
        }
      </div>
    );

  }

  renderToolTip = ({ active, payload, label }) => {
    if (payload.length) {
      let nutrient = payload[ 0 ].payload;
      if (active) {
        return (
          <Paper style={{ marginLeft: 10, marginRight: 10 }} elevation={4}>
            <Typography style={{ marginTop: 10, margin: "inherit" }} variant="subtitle1">{`${nutrient.name}`}</Typography>
            <Typography style={{ marginBottom: 10, margin: "inherit" }} variant="subtitle1">
              {
                `${nutrient.amountEaten} / ${(nutrient.percentageEaten > 100 && nutrient.upperLimit ? nutrient.upperLimit + " " + nutrient.unit + "(max)" : nutrient.lowerLimit + " " + nutrient.unit)}`}</Typography>
          </Paper>
        );
      }
    }
    return null;
  };

  renderLegend = (data) => {
    return (
      <List dense >
        {/* {init ? <ListSubheader>
            {"Details"}
          </ListSubheader> : null} */}
        {data.map(object => {
          return (
            object.subNutrients.length ?
              <Paper key={object.label} children={this.renderLegendItem(object)} style={{ background: "white", borderStyle: "ridge" }} />
              :
              this.renderLegendItem(object)
          );
        })}
      </List>
    );
  }


  render() {
    let data = this.getData();
    if (data.length === 0) {
      return <></>;
    }
    console.log("DATA: ", data);
    let dataToRender = this.getDataToRender(data);

    let rp = this.renderPies(dataToRender);
    return (<>
      {/* <Grid container direction="row" alignItems="flex-start" justify="space-between" > */}
      <Grid item>
        <Typography variant="subtitle1" align="center">{`Energy consumed: ${this.props.energy} / ${this.props.nutritionRda.energy_kcal} kcal (maximum) `}</Typography>

        <PieChart outerRadius={this.pieRadius} width={this.pieChartWidth} height={this.pieChartHeight} >
          {rp}
          <Pie
            key={`pie-border`}
            data={[ { name: "border", value: 1 } ]}
            cx='50%'
            cy='50%'
            labelLine={false}
            innerRadius={this.pieRadius - 24}
            dataKey="value"
            // animationBegin={300}
            animationDuration={this.animationDuration}
            children={<Cell key={`cell-border`} fill={"black"} stroke="grey" strokeWidth="1" />}


          />
        </PieChart>
      </Grid>
      <Grid item>
        <Paper style={{ background: "white", borderStyle: "solid" }}>{this.renderLegend(data)}</Paper>

      </Grid>
      {/* </Grid> */}
    </>
    );
  }
}




export class NutritionBarChart extends React.PureComponent {
  constructor(props) {
    super(props);

  }

  getData = () => {
    let data = [];
    if (!_.isEmpty(this.props.nutritionRda) && !_.isEmpty(this.props.microNutrients)) {
      data = Object.entries(this.props.microNutrients).map(([ key, value ]) => {
        let splitKey = String(key).split('_');
        let name = splitKey[ 0 ];
        let unit = splitKey[ 1 ];
        return new MicroNutrient({
          name: name,
          unit: unit,
          lowerLimit: this.props.nutritionRda[ key ],
          upperLimit: this.props.nutritionRda[ name + "Upper_" + unit ],
          amountEaten: value
        })
      });
      data.sort((a, b) => a.checked > b.checked ? 1 : a.checked < b.checked ? -1 : 0);
    }
    return data;
  }
  renderRefLineLabel = (labelName) => (props) => {
    return <text textAnchor="middle" x={props.viewBox.x} y={props.viewBox.y - 10}>{labelName}</text>;
  }

  renderToolTip = ({ active, payload, label }) => {
    if (payload.length) {
      let nutrient = payload[ 0 ].payload;
      if (active) {
        return (
          <Paper style={{ marginLeft: 10, marginRight: 10 }} elevation={4}>
            <Typography style={{ marginTop: 10, margin: "inherit" }} variant="subtitle1">{`${nutrient.name}`}</Typography>
            <Typography style={{ marginBottom: 10, margin: "inherit" }} variant="subtitle1">
              {
                `${nutrient.amountEaten} / ${(nutrient.percentageEaten > 100 && nutrient.upperLimit ? nutrient.upperLimit + " " + nutrient.unit + "(max)" : nutrient.lowerLimit + " " + nutrient.unit)}`}</Typography>
          </Paper>
        );
      }
    }
    return null;
  };
  renderBarLabel = props => {
    return <text opacity={(props.value / 1.5 + 30) + "%"} textAnchor="middle" fill="white" x={props.x + props.width / 2} y={props.y + props.height / 2} dy="0.355rem">{props.value + "%"}</text>;
  }

  render() {
    let data = this.getData();
    return (
      <Grid item>
        <BarChart layout="vertical" width={600} height={500} data={data}>
          <CartesianAxis />
          <XAxis
            unit="%"
            orientation="top"
            type="number"
            domain={[ 0, 250 ]}
            tick={false}
          // label={{value: "Lower Limit", position: "centerTop"}}
          // axisLine={false}
          />
          <YAxis width={140} type="category" dataKey="name" tickSize={5} />
          <ReferenceLine isFront={true} x={100} label={this.renderRefLineLabel("Minimum")} stroke="green" strokeWidth={2} strokeDasharray="5" />
          <ReferenceLine x={200} label={this.renderRefLineLabel("Maximum")} stroke="red" strokeWidth={2} isFront strokeDasharray="5" />

          <Tooltip
            isAnimationActive={false}
            content={this.renderToolTip}

          />
          <Bar unit="%"
            animationDuration={300} maxBarSize={30} dataKey="percentageEaten" fill={"#388e3c"} stackId="limit" >
            <LabelList position="inside"
              content={this.renderBarLabel}
            />
          </Bar>
          <Bar animationDuration={300} maxBarSize={30} dataKey="percentageRemaining" fill="#e8f5e9" stackId="limit" />
        </BarChart>
      </Grid>
    );
  }
}

NutritionBarChart.propTypes = {
  microNutrients: PropTypes.object.isRequired,
  nutritionRda: PropTypes.object.isRequired
}