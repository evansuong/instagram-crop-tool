import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import CropRoundedIcon from '@material-ui/icons/CropRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import StepConnector from '@material-ui/core/StepConnector';
import '../styles/main.css'



const lightBG = '#ffbb5c';
const darkBG = '#e68a00';

const LightColorlibConnector = withStyles({
   
    active: {
        '& $line': {
            backgroundColor: lightBG,
        },
    },
    completed: {
        '& $line': {
            backgroundColor: lightBG,
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#ccc',
        borderRadius: 1,
        marginRight: 5,
        marginLeft: -1
    }
})(StepConnector);


const DarkColorlibConnector = withStyles({
   
  active: {
      '& $line': {
          backgroundColor: darkBG,
      },
  },
  completed: {
      '& $line': {
          backgroundColor: darkBG,
      },
  },
  line: {
      height: 3,
      border: 0,
      backgroundColor: '#ccc',
      borderRadius: 1,
      marginRight: 5,
      marginLeft: -1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 40,
      height: 40,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundColor: lightBG,
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor: lightBG,
    },
    light: {
      backgroundColor: lightBG,
    },
    dark: {
      backgroundColor: darkBG
    }
  });
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed, theme } = props;

    console.log(props)

    const icons = {
      1: <PublishRoundedIcon />,
      2: <CropRoundedIcon />,
      3: <GetAppRoundedIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
          [classes.light]: theme === 'light' && (active || completed),
          [classes.dark]: theme === 'dark' && (active || completed)
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
}
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  
  const useStyles = makeStyles(() => ({

    stepper: {
        padding: 30,
        width: '100%',
        backgroundColor: 'transparent'
    }
  }));
  
  const Steps = ({ activeStep, theme }) => {
    const classes = useStyles();
    const steps = ['Import', 'Edit', 'Export'];
  
    return (
        
      <Stepper className={`${classes.stepper}`} activeStep={activeStep} connector={theme === 'light' ? <LightColorlibConnector /> : <DarkColorlibConnector/>} >
          {steps.map((label) => (
              <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} StepIconProps={{theme}} />
              </Step>
          ))}
      </Stepper>
    
    )
}

export default Steps;