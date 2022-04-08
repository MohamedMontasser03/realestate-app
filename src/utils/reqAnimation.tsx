function reqAnimation(callback: (curTime: number) => void, intraval = 0) {
    let lastFrame = 0;
  
    const anim = (t: number) => {
      if (t - lastFrame > intraval) {
        callback(t);
        lastFrame = t;
      }
  
      requestAnimationFrame(anim);
    };
  
    requestAnimationFrame(anim);
  }
  
  export default reqAnimation;