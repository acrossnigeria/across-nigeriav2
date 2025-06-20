const ProcessLoader = ( { size, className }) => {
  return (
    <div style={{ width:size?size:'20px', height:size?size:'20px' }} className={`loader ${className}`}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
    </div>
  );
}

export default ProcessLoader;
// This Loader component renders a loading animation using a series of div elements styled as bars.