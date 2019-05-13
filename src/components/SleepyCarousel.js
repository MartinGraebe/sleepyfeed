import React from "react";
import { Carousel } from "react-responsive-carousel";
import { buildUrl } from 'react-instafeed'
import "react-responsive-carousel/lib/styles/carousel.min.css";



class SleepyCarousel extends React.Component {
    constructor(){
        super()
        this.state = {

            instaObject: [],
            imageurl: [],
            itOn: false,
            speed: 3000,
            chromaColour: 'green',
            howFar: 15,
            hashtag: 'illustration',

        }
        this.code = this.code.bind(this)
        this.activate = this.activate.bind(this)
        this.handleChangeChroma = this.handleChangeChroma.bind(this)
        this.handleChangeSpeed = this.handleChangeSpeed.bind(this)
        this.handleChangeHowFar = this.handleChangeHowFar.bind(this)
        this.handleChangeHash = this.handleChangeHash.bind(this)
        this.apply = this.apply.bind(this)

      
        
    }
    async componentDidMount(){
    
          this.apply()
        
         
    }
  /* Parse Image Urls from JSON Object and Filter by Hashtag */
   async code() { 
        let imgs = []
       
        
        for (let i = 0; i < this.state.instaObject.length; i++){

      
          if (this.state.instaObject[i].tags.includes(this.state.hashtag)){
          let n = this.state.instaObject[i].images.standard_resolution.url  
          imgs.push(n)
          }
             

        }
       
      
        this.setState({
          imageurl: imgs
        })
        
    }
    /* Toggle displaying the instagram feed (workaround so that the JSON object can be fetched first and the autoplay on the feed works) */
    activate(){

      let status = !this.state.itOn
      this.setState({

        itOn: status
      })
    }
   /* Event handler for the Chroma Key field */
    handleChangeChroma(event){
        
      this.setState({chromaColour: event.target.value})
       
  }
    /* Event handler for the Interval field */
  handleChangeSpeed(event){

    this.setState({speed: event.target.value})
  }
    /* Event handler for the 'number of posts to be fetched' field */
  handleChangeHowFar(event){

    this.setState({howFar: event.target.value})
  }
   /* Event handler for the hashtag field */
  handleChangeHash(event){

    this.setState({hashtag: event.target.value})
  }
  /* Fetch Json Object via the Instagram API */
  async apply(){

    const options = {
      accessToken: process.env.REACT_APP_ACCESS_TOKEN,
      get: 'user', // popular, user
      locationId: null,
      resolution: 'standard_resolution', // thumbnail, low_resolution, standard_resolution
      limit: this.state.howFar,
      sortBy: 'none', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
     
     
      userId: process.env.REACT_APP_USER_ID,
    }

    const instagramUrl = buildUrl(options)
    
   
   await fetch(instagramUrl).then(response => response.json())
    .then(data =>{
      this.setState ({

          instaObject: data.data
        })
    })
    this.code()
  }
    render(){
       
           
     
   
        
         const displayThis = Object.keys(this.state.imageurl).map((i) =>{
          return (<div key={i}><img src={this.state.imageurl[i]} alt='' /></div>)
    })
         
        return(
    <div className="Content" >  
        <div className="carouselClass" style={{ backgroundColor: this.state.chromaColour}}>     
      { this.state.itOn ?     <Carousel 
                   
                    showArrows={false} 
                    showThumbs={false} 
                    autoPlay={true}
                    infiniteLoop={true} 
                    showIndicators={false}
                    showStatus={false}
                    interval={this.state.speed}
                   
        >
        
             {displayThis}
    
     
      
         
   </Carousel> : null }
      
        
            </div>
            
            <div>
            <div className=" Menu buttonHold">
                <div  >
                    <button className="myButton" onClick={this.activate}>Toggle SleepyFeed</button>
                
                </div>
                
                
              </div>  
              <div className="Menu"><label> Chroma Key: </label>
                        <input type="text" name="chroma" value={this.state.chromaColour} onChange={this.handleChangeChroma} />
                    </div>
                    <div className="Menu" ><label> Interval: </label>
                        <input type="text" name="speed" value={this.state.speed} onChange={this.handleChangeSpeed} />
                    </div>
                    <div className="Menu" ><label> How far back: </label>
                        <input type="text" name="limit" value={this.state.howFar} onChange={this.handleChangeHowFar} />
                        <button onClick={this.apply}>Apply</button>
                    </div>
                    <div className="Menu" ><label> Hashtag: </label>
                        <input type="text" name="hashtag" value={this.state.hashtag} onChange={this.handleChangeHash} />
                        <button onClick={this.apply}>Apply</button>
                    </div>
              </div>
          
           </div>
    )

    }
}

export default SleepyCarousel

