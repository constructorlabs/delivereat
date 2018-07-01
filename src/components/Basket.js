import React from 'react';

class Basket extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="basket" className="basket" >
                <div className={"basket__checkout " + (this.props.basketCount > 0 ? '' : 'hidden')}>
                    Checkout (&pound;{this.props.orderAmount.toFixed(2)})</div>
                <div className="basket__count">{this.props.basketCount}</div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"></rect><path d="M15.224131264159041,23.90284755599305 c0,1.263747797707282 -1.0244660699385122,2.2882268238177517 -2.2882268238177517,2.2882268238177517 S10.647688756409707,25.16659692781468 10.647688756409707,23.90284755599305 c0,-1.263747797707282 1.0244660699385122,-2.2882268238177517 2.2882268238177517,-2.2882268238177517 S15.224131264159041,22.639100121542924 15.224131264159041,23.90284755599305 zM22.201080719281435,21.614633567261535 c-1.263747797707282,0 -2.2882268238177517,1.0244790261104697 -2.2882268238177517,2.2882268238177517 c0,1.263747797707282 1.0244790261104697,2.2882268238177517 2.2882268238177517,2.2882268238177517 c1.263747797707282,0 2.2882268238177517,-1.0244790261104697 2.2882268238177517,-2.2882268238177517 C24.489296645384456,22.639100121542924 23.46482815373156,21.614633567261535 22.201080719281435,21.614633567261535 zM29.303920574971926,10.872735814890802 l-2.815612767862774,8.368598281765571 c0,0 -0.23307096878664169,1.2419328734452506 -1.420575841709848,1.2419328734452506 s-12.800440223611531,0 -14.217600358267646,0 s-1.4767177197732906,-1.5566713466945714 -1.4767177197732906,-1.5566713466945714 S7.86269202831113,7.7185734303494655 7.787828602854802,7.041457729334525 s-0.9408012868085791,-1.1789876731612026 -0.9408012868085791,-1.1789876731612026 L3.1212157395385134,4.122066024092078 c-2.039834969791343,-1.0667044013771942 -1.1126408117668518,-3.09633426675191 0,-2.6301791913780903 c4.724455269220584,2.2286705706434873 6.919108260075291,3.326003604699679 7.0603198788688815,4.203859812309929 c0.1429118893272907,0.879556977622542 0.3912907720460268,2.9976581237519895 0.3912907720460268,2.9976581237519895 v0.013606974588992182 c0.028927703741699062,-0.008504359945854523 0.04933816988210715,-0.013606974588992182 0.04933816988210715,-0.013606974588992182 s14.488103917653916,0 17.414313717574714,0 C30.139258985303513,8.693405010947345 29.303920574971926,10.876150432173063 29.303920574971926,10.872735814890802 zM25.2310580745243,15.532544387300732 l-0.028927703741699062,0.0017008718236240228 H11.418364486615701 L11.70247517478606,17.78674006972915 h12.858281418658635 L25.2310580745243,15.532544387300732 zM26.573365923610254,10.990135684826555 H10.848430473862209 l0.3028325080061123,2.407313659993804 c3.0163675625729525,0 11.849421360557244,0 14.710969449038203,0 L26.573365923610254,10.990135684826555 z" fill="#666666" id="svg_1"></path></svg></div >
        )
    }
}
export default Basket;

