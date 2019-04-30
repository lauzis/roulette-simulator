import React from 'react';

class SpinTable extends React.Component {

    constructor(props){
        super(props);

        this.initialValues = {
            budget:100,
            startBet:1,
            currentBet:1,
            betCeiling:50,
            spin:0,
            spinHistory:[],
            betOn:"",
            step:0,
            strategy:"black"
        };

        this.state = {
            ...this.initialValues
        };
    }



    spin(){
        let number = Math.floor(Math.random() *36) + 0;
        let history = this.state.spinHistory;

        if (history[number]){
            history[number]++;
        } else {
            history[number]=0;
        }

        this.setState({
            spin:number,
            spinHistory: history,
            step:this.state.step+1
        })
    }

    isBlack(){
        const {spin} = this.state;
        if (spin!==0){
            return true;
            return (spin % 2 === 1);
        }
        return true;
        return false;
    }

    isRed(){
        const {spin} = this.state;
        if (spin!==0){
            return (spin % 2 === 0);
        }
        return false;
    }

    isPair(){
        const {spin} = this.state;
        if (spin!==0){
            return (spin % 2 === 0);
        }
        return false;
    }

    isOdd(){
        const {spin} = this.state;
        if (spin!==0){
            return (spin % 2 === 1);
        }
        return false;
    }

    isFirst12(){
        const {spin} = this.state;
        if (spin!==0){
            return spin <  13;
        }
        return false;
    }

    isSecond12(){
        const {spin} = this.state;
        if (spin!==0){
            return (spin >  12) && (spin <  27);
        }
        return false;
    }

    isThird12(){
        const {spin} = this.state;
        if (spin!==0){
            return (spin >  26) && (spin <  37);
        }
        return false;
    }

    isFirstHalf(){
        const {spin} = this.state;
        if (spin!==0){
            return (spin >  19);
        }
        return false;
    }

    isSecondHalf(){
        const {spin} = this.state;
        if (spin!==0){
            return (spin > 18);
        }
        return false;
    }

    onSpin(){
        this.spin();
    }

    onReset(){
        this.setState({
            ...this.initialValues
        });
    }


    placeStrategy(strategyName){
        this.setState({
            strategy:strategyName
        });
    }

    placeBet(betAmmount){
        const {betCeiling, budget} = this.state;
        if (betAmmount>betCeiling){
            betAmmount = betCeiling;
        }

        this.setState({
            budget: (budget-betAmmount),
            currentBet : betAmmount
        });
    }

    spinResult(){
        const {strategy, currentBet,budget} = this.state;
        let result = null;
        let multiplier = 1;
        let summ = 0;

        switch(strategy){
            case "black":
                result = this.isBlack();
                multiplier = 2;
                break;
            case "red":
                result = this.isRed();
                multiplier = 2;
                break;

        }

        if (result){
            summ =  budget+(multiplier * currentBet);

            console.log(this.state);
            console.log("should be",summ);

            this.setState({budget: summ});
            return true;
        }

        return false;
    }

    colorStrategy(){
        let {budget,currentBet,step} = this.state;
        let result = null;
        //let strategy = (step % 2) ? "black" : "red";
        let strategy = "black";
        let stepLimit = 10;

        this.placeBet(currentBet);
        this.placeStrategy(strategy);
        this.spin();
        result = this.spinResult();

        console.log("spin result",result);
        console.log("spin result",this.state);

        if (result===true){
            currentBet = 1;
        } else {
            currentBet = (currentBet * 2)+1;
            if (currentBet>budget){
                currentBet = budget;
            }
        }

        console.log("new bet",currentBet);

    }


    onRunStrategy(){
        let {budget,currentBet,step} = this.state;
        // var strategy  = this.colorStrategy;
        // let interval = setInterval(function(){
        //     strategy();
        // },500);

        this.colorStrategy();
    }

    render(){
        const {spin,step,budget, currentBet} = this.state;
        return (
            <div>
                <h1>{spin}</h1>
                <p>step:{step}</p>
                <p>budget:{budget}</p>
                <p>current bet:{currentBet}</p>


                <button onClick={()=>this.onSpin()}>Spin</button>
                <button onClick={()=>this.onReset()}>Reset</button>
                <button onClick={()=>this.onRunStrategy()}>RunStrategy</button>

                <p>Is Pair: {this.isPair() ? "Yes" : "No"}</p>
                <p>Is odd: {this.isOdd() ? "Yes" : "No"}</p>
                <hr/>
                <p>Is Red: {this.isRed() ? "Yes" : "No"}</p>
                <p>Is Black: {this.isBlack() ? "Yes" : "No"}</p>
                <hr/>
                <p>Is First 12: {this.isFirst12() ? "Yes" : "No"}</p>
                <p>Is Second 12: {this.isSecond12() ? "Yes" : "No"}</p>
                <p>Is Third 12: {this.isThird12() ? "Yes" : "No"}</p>
                <hr/>
                <p>Is First Half: {this.isFirstHalf() ? "Yes" : "No"}</p>
                <p>Is Second Half: {this.isSecondHalf() ? "Yes" : "No"}</p>
                <hr/>
                <hr/>
            </div>
        )
    }
}

export default SpinTable;