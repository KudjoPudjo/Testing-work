import React, { useState } from "react"
import "./page3.css"
import PicComponent from "./piccomponent/piccomponent"
import TarifListItem from "./tarif-list-item/tarifListItem"




function ContentPage() {
    const [picArr, setPicArr] = useState([])
    const [tarifs, setTarifs] = useState(["New Tariff"])
    const [newTariff, setNewTariff] = useState("")
    const [tarifInfo, setTariffInfo] = useState([])
    const [tarif, setTarif] = useState("");
    const [currency, setCurrency] = useState()
    const [Price, setPrice] = useState("");
    const [Name,setName] = useState("");
    const [usluga,setUsluga] = useState();
    const [categoria,setCategoria] = useState();
    const [discription,setDiscription] = useState("")

    function AddNewTariff(e) {
        e.stopPropagation()
        let arr = tarifs.concat([])
        arr.push(newTariff)
        setTarifs(arr)
        setNewTariff("")
    }

    function PreviewAdd(e,i) {
        e.stopPropagation()
        let file = e.target.files[0]
        if(!file)return
        if (file.type === "image/jpeg" || file.type === "image/png") {
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = function () {                
                if(typeof i !== "undefined"){
                    console.log(i);
                    let arr1 = picArr.concat([])
                    arr1.forEach((elem,index)=>{if(index===i)elem.push(fileReader.result)})
                    setPicArr(arr1)
                }else{
                    let arr = [fileReader.result]
                    let arr1 = picArr.concat([])
                    arr1.push(arr)
                    console.log(arr1);
                    setPicArr(arr1) 
                }
                // if (!picArr.length) {
                //     let arr = [fileReader.result]
                //     let arr1 = picArr.concat([])
                //     arr1.push(arr)
                //     setPicArr(arr1)
                // } else if (picArr.length) {
                //     if (picArr[picArr.length - 1].length < 3) {
                //         picArr[picArr.length - 1].push(fileReader.result)
                //     } else if (picArr[picArr.length - 1].length === 3) {
                //         let arr = [fileReader.result]
                //         picArr.push(arr)
                //     }
                // }
            }
        }

    }

    function NewTariffList(e) {
        e.stopPropagation()
        let obj = {
            price: Price,
            tarifName: tarif,
            currenc: currency
        }
        let arr = tarifInfo.concat([])
        arr.push(obj)
        setTariffInfo(arr)
    }

    function deleteTarif(key) {
        let arr = tarifInfo.filter((elem, i) => i !== key)
        setTariffInfo(arr)
    }

    async function Sub(e){
        e.preventDefault()
        let obj = {
            picArr:picArr,
            tarifInfo:tarifInfo,
            name:Name,
            usluga:usluga,
            categoria:categoria,
            discription:discription
        }
        try{
            let responce = await fetch("http//localhost:3000",{
                method:"POST",
                headers:{
                    "Content-type":"Application/json"
                },
                body:JSON.stringify(obj)                
            })
            console.log(responce);
        }catch(e){
            console.log(e);
        }
    }

    return (
        <form className="content-page-bar">
            <input className="form-name-inp" placeholder="Введите название" value={Name} onChange={(e)=>setName(e.target.value)} type="text" />
            <div className="form-select-wrp">
                <div>
                    <h3>Услуга</h3>
                    <select value={usluga} onChange={(e)=>{console.log(e.target.value);setUsluga(e.target.value)}} className="form-select-item" name="selector1">
                        <option value="Услуга 1">Услуга 1</option>
                        <option value="Услуга 2">Услуга 2</option>
                        <option value="Услуга 3">Услуга 3</option>
                    </select>
                </div>
                <div>
                    <h3>Категория</h3>
                    <select value={categoria} onChange={(e)=>setCategoria(e.target.value)} className="form-select-item" name="selector2">
                        <option value="Категория 1">Категория 1</option>
                        <option value="Категория 2">Категория 2</option>
                        <option value="Категория 3">Категория 3</option>
                    </select>
                </div>
            </div>
            <div className="form-discription">
                <h3>Описание</h3>
                <textarea value={discription} onChange={(e)=>setDiscription(e.target.value)} className="form-discrption-txt" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="form-preview">
                <h3>Превью</h3>
                <div className="preview-wrap">
                    {picArr.map((elem, i) => (<PicComponent key={i} PreviewAdd={PreviewAdd} i={i} picarr={elem}></PicComponent>))}
                    <div className="add-button" >
                        <div className="add-button-wrp">
                            <div className="d-2">
                                +
                            </div>
                            <input className="file-inp" onChange={PreviewAdd} type="file" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="price-bar">
                <div className="price-inp-wrp">
                    <h3>Price</h3>
                    <input value={Price} onChange={(e) => setPrice(e.target.value)} type="text" className="price-inp" />
                </div>
                <div className="price-inp-wrp">
                    <h3>Currency</h3>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} name="selector" className="selector-currency">
                        <option value="₽">₽</option>
                        <option value="$">$</option>
                    </select>
                </div>
                <div className="price-inp-wrp">
                    <h3>Tariff</h3>
                    <div className="tariff-wrp">
                        <select value={tarif} onChange={(e) => setTarif(e.target.value)} name="selector" className="selector-tariff">
                            {tarifs.map((elem, i) => <option key={i} value={elem}>{elem}</option>)}
                        </select>
                        <div className="tariff-add-wrp">
                            <input className="tarif-add-inp" type="text" value={newTariff} onChange={(e) => setNewTariff(e.target.value)} placeholder="Add new" />
                            <input type="button" className="tariff-add" onClick={AddNewTariff} value="+" />
                        </div>
                        <input onClick={NewTariffList} className="append-button" type="button" value="APPEND" />
                    </div>
                </div>
            </div>
            <div className="tarif-info-list">
                {tarifInfo.map((elem, i) => (<TarifListItem key={i} tarifInfo={elem} i={i} deleteTarif={deleteTarif}></TarifListItem>))}
            </div>
            <div className="upload">
                <input type="button" className="upload-button" onClick={Sub} value="Отправить"/>
            </div>
        </form>
    )
}


export default ContentPage