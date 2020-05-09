import React from 'react';
import './LandingPage.scss';
import { Experiment, Variant, emitter , experimentDebugger} from '@marvelapp/react-ab-test';
import Mixpanel from 'mixpanel';

var mixpanel = Mixpanel.init("a8b994d7cdec181a07a9647e67463abc");

experimentDebugger.enable();
emitter.defineVariants('landingPageCTAExperiment', ['control', 'blue-variant', 'green-variant'], [34, 33, 33]);

emitter.addPlayListener(function(experimentName, variantName) {
    console.log(`Displaying experiment ${experimentName} variant ${variantName}`);
});

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener(function(experimentName, variantName) {
    console.log(
        `Variant ${variantName} of experiment ${experimentName} was clicked`
    );
    mixpanel.track(experimentName + " " + variantName, {
        name: experimentName,
        variant: variantName,
    });
});

class LandingPage extends React.Component {
    onButtonClick(e) {
        emitter.emitWin('landingPageCTAExperiment');
    }
    render(){
        return(
            <div className="mainComponent">
                <header>
                    Doggo App
                </header>
                <div className="description">
                    Doggo App description
                </div>
                <Experiment name='landingPageCTAExperiment'>
                    <Variant name='control'>
                        <button className="callToAction" onClick={(e)=>this.onButtonClick(e)}>Learn more1</button>
                    </Variant>
                    <Variant name='blue-variant'>
                        <button className="callToAction blue" onClick={(e)=>this.onButtonClick(e)}>Learn more2</button>
                    </Variant>
                    <Variant name='green-variant'>
                        <button className="callToAction green" onClick={(e)=>this.onButtonClick(e)}>Learn more3</button>
                    </Variant>
                </Experiment>
            </div>
       )
    }
}
export default LandingPage