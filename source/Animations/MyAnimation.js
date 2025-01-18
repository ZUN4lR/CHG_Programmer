export const fade_slide_In  = {
    from: {
        left:-60,
      opacity: 0,
    },
    to: {
        left:60,
      opacity: 1,
    },
  };

  export const fade_slide_Out = {
    from: {
        left:60,
      opacity: 1,    
    },
    to: {
      left:-60,
      opacity: 0,
    },
  };

  export const move_Up = {
    from: {
      transform: [{ rotateX: `90deg` }],
        top:0,
    },
    to: {
      transform: [{ rotateX: `0deg` }],
      top:-100,

    },
  };
  export const move_Down= {
    from: {
      transform: [{ rotateX: `0deg` }],
        top:-100,
    },
    to: {
      transform: [{ rotateX: `90deg` }],
      top:0,
    },
  };