import React from "react";



function PicComponent({ picarr, PreviewAdd,i }) {
    console.log(i);
    return (
        <div className="picture-wrp">
            {picarr.map((elem, i) => {
                return(<div className="add-button w" key={i}>
                    <img className="preview-picture" src={elem}  alt="Pic" />
                </div>)
            })}
            {picarr.length < 3 ? <div className="add-button w" >
                <div className="add-button-wrp">
                    <div className="d-2">
                        +
                            </div>
                    <input className="file-inp" onChange={(e)=>PreviewAdd(e,i)} type="file" />
                </div>
            </div> : null}
        </div>
    )
}


export default PicComponent