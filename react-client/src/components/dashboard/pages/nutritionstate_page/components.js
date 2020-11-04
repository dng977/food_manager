import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, Label, LabelList,
} from 'recharts';
import { macronutrient, MacroNutrient } from './objects';
import _ from 'lodash';


const COLORS = [ '#ffecb3', '#ffb300', '#c8e6c9', '#689f38', '#b3e5fc', '#0288d1', '#9e9e9e' ];
const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ startIndex, endIndex,
//   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
// }) => {
//   console.log(data.slice(startIndex, endIndex));
//   console.log("inde", index);

//   const radius = outerRadius;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (<>
//     <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {data.slice(startIndex, endIndex)[ index ].name}
//     </text>
//   </>
//   );
// };

export default class MacroPieChart extends React.Component {

  constructor(props) {
    super(props);
    console.log("PROPS: ", props);
  }
  getData = () => {
    let data = [];
    if (!_.isEmpty(this.props.nutritionRda) && !_.isEmpty(this.props.macroState)) {
      console.log("not empty");
      data = [
        new MacroNutrient(macronutrient.carb,
          this.props.nutritionRda.carbLLimit, this.props.nutritionRda.carbULimit,
          this.props.nutritionRda.carbohydrates_g, this.props.macroState.carbohydrates_g,
          this.props.nutritionRda.energy_kcal,
          { colorEaten: '#00695c', colorRemaining: '#e0f2f1' }, []
        ),
        new MacroNutrient(macronutrient.protein,
          this.props.nutritionRda.proteinLLimit, this.props.nutritionRda.proteinULimit,
          this.props.nutritionRda.protein_g, this.props.macroState.protein_g,
          this.props.nutritionRda.energy_kcal,
          { colorEaten: '#1565c0', colorRemaining: '#e3f2fd' }, []
        ),
        new MacroNutrient(macronutrient.fat,
          this.props.nutritionRda.fatLLimit, this.props.nutritionRda.fatULimit,
          this.props.nutritionRda.fat_g, this.props.macroState.fat_g,
          this.props.nutritionRda.energy_kcal,
          { colorEaten: '#0288d1', colorRemaining: '#b3e5fc' }, [
          new MacroNutrient(macronutrient.monoFat,
            this.props.nutritionRda.monoFatLLimit, this.props.nutritionRda.monoFatULimit,
            this.props.nutritionRda.monoFat_g, this.props.macroState.monoFat_g,
            this.props.nutritionRda.energy_kcal,
            { colorEaten: '#6a1b9a', colorRemaining: '#f3e5f5' }, []
          ),
          new MacroNutrient(macronutrient.polyFat,
            this.props.nutritionRda.polyFatLLimit, this.props.nutritionRda.polyFatULimit,
            this.props.nutritionRda.polyFat_g, this.props.macroState.polyFat_g,
            this.props.nutritionRda.energy_kcal,
            { colorEaten: '#4527a0', colorRemaining: '#ede7f6' }, []
          ),
          new MacroNutrient(macronutrient.satFat,
            this.props.nutritionRda.satFatLLimit, this.props.nutritionRda.satFatULimit,
            this.props.nutritionRda.satFat_g, this.props.macroState.satFat_g,
            this.props.nutritionRda.energy_kcal,
            { colorEaten: '#283593', colorRemaining: '#e8eaf6' }, []
          )
        ],

        ),
      ];

      this.calculateAngles(data, 0, 0);
    }
    return data;
  }



  renderCells = (data) => {
    return data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
  }

  renderPie = (object) => {
    let pies = [
      <Pie
        key={`pie-${object.label}`}
        data={[ { name: object.label, value: object.calsRemaining[ 0 ] }, { name: object.label, value: object.calsEaten[ 0 ] } ]}
        cx='50%'
        cy='50%'
        labelLine={false}
        // label="name"
        // label={<renderCustomizedLabel startIndex={0} endIndex={2}/>}
        outerRadius={200}
        dataKey="value"
        animationBegin={300}
        animationDuration={1000}
        startAngle={object.startAngle[ 0 ]}
        endAngle={object.getEndAngle1()}
      >
        <Label position="outside" key='label'>{object.label}</Label>
        <Cell key={`cell-${object.label}`} fill={object.colorRemaining} />
        <Cell key={`cell-${object.label + 1}`} fill={object.colorEaten} />
      </Pie>
    ];
    if (object.calsEaten[ 1 ] > 0) {
      pies[ 1 ] = (
        <Pie
          key={`pie-${object.label}`}
          data={[ { name: object.label, value: object.calsRemaining[ 1 ] }, { name: object.label, value: object.calsEaten[ 1 ] } ]}
          cx='50%'
          cy='50%'
          labelLine={false}
          // label="name"
          // label={<renderCustomizedLabel startIndex={0} endIndex={2}/>}
          outerRadius={200}
          dataKey="value"
          animationBegin={300}
          animationDuration={1000}
          startAngle={object.startAngle[ 1 ]}
          endAngle={object.getEndAngle2()}
        >
          <Label position="outside" key='label'>{object.label}</Label>
          <Cell key={`cell-${object.label}`} fill={object.colorRemaining} />
          <Cell key={`cell-${object.label + 1}`} fill={object.colorEaten} />
        </Pie>
      );
    }

    return pies;
  }

  calculateAngles = (data, start, start2) => {

    const angleReducer = (acc, cur, idx) => {

      //CALCULATE ANGLES
      data[ idx ].startAngle[ 0 ] = acc[ 0 ];
      if (data[ idx ].calsRemaining[0] < 0) {
        data[ idx ].startAngle[ 1 ] = acc[ 1 ];
      }
      //CHECK FOR SUBNUTRIENTS
      if (data[ idx ].subNutrients.length) {
        this.calculateAngles(data[ idx ].subNutrients, acc[ 0 ], acc[ 1 ]);
      }

      return [ data[ idx ].minAmountPercentage[0] * 360 + acc[ 0 ], - data[ idx ].minAmountPercentage[1] * 360 + acc[ 1 ] ];
    };

    data.reduce(angleReducer, [ start, start2 ]);
  }

  renderPies = () => {
    let data = this.getData();
    console.log("RENDER PIES", data);

    if (data)
      return data.flatMap((object, index) => {

        //subnutrients
        if (object.subNutrients.length) {
          return object.subNutrients.map((subObject, subIndex) => {
            return this.renderPie(subObject);
          });
        } else {
          return this.renderPie(object);
        }

      });
  }
  // const data = [
  //   { name: 'Carbohydrates', value: 30, color: '#ffecb3' },
  //   { name: 'Carbohydrates', value: 5, color: '#ffb300' },

  //   { name: 'Protein', value: 10, color: '#c8e6c9' },
  //   { name: 'Protein', value: 5, color: '#689f38' },

  //   { name: 'Fat', value: 20, color: '#b3e5fc' },
  //   { name: 'Fat', value: 5, color: '#0288d1' },

  //   { name: 'To be filled', value: 25, color: '#9e9e9e' },

  // ];

  render() {
    let rp = this.renderPies();
    console.log(rp);
    return (
      <PieChart width={400} height={400}>
        {this.renderPies()}

      </PieChart>
    );
  }
}
