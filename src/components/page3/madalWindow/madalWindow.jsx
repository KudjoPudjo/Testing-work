import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog({func}) {  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  

  return (
    <div>      
      <Dialog
        fullScreen={fullScreen}
        open={true}        
        aria-labelledby="responsive-dialog-title"
      >        
        <DialogContent>
          <DialogContentText>
            Удалить этот тариф?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>func(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>func(true)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}