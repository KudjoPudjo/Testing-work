import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ResponsiveDialog from "../madalWindow/madalWindow";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function TarifListItem({ tarifInfo , i,deleteTarif}) {
    const [timeActive, setTimeActive] = useState(false)    
    const [madalwindow,setMadalWindow] = useState(false)
    const classes = useStyles();

    function DeleteTarifInfo(){
        setMadalWindow(true)
    }
    function MadalWindow(agree){
        setMadalWindow(false)
        if(agree)deleteTarif(i)
        else return
    }
    return (
        <div className="tarif-list-item">
            <input className="tarif-info-checkbox" type="checkbox" />
            <h4 className="tariff-info-txt">{tarifInfo.tarifName}</h4>
            <input className="tariff-info-price" type="text" defaultValue={tarifInfo.price} />
            <h4 className="tariff-info-txt">{tarifInfo.currenc}</h4>
            <input value={timeActive} onChange={() => setTimeActive((prevstate) => !prevstate)} className="tarif-info-checkbox" type="checkbox" />
            <h4 className="tariff-info-txt">Time valid</h4>
            <div className="data-picer-wrp">
                <div className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="Date start"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="Date end"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                {timeActive?null:<div className="time-recover"></div>}
            </div>

            <input className="tarif-info-checkbox" type="checkbox" />
            <h4 className="tariff-info-txt">Week day</h4>
            <IconButton aria-label="delete" className={classes.margin} onClick={DeleteTarifInfo}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            {madalwindow?<ResponsiveDialog func={MadalWindow}></ResponsiveDialog>:null}
        </div>
    )
}


export default TarifListItem