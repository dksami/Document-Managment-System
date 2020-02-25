import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import FolderIcon from '@material-ui/icons/Folder';
// React runtime PropTypes
import axios from 'axios'
import { connect } from 'react-redux';

export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
}


const AppMenuItem = props => {
  const { Name,  children } = props
  const items = children
  const name = Name
  const Icon = FolderIcon
  const classes = useStyles()
  const isExpandable = items && items.length > 0
  const [open, setOpen] = React.useState(false)
  function handleClick() {
    setOpen(!open)
    fetchData()
  }


function fetchData() {
    axios.get('http://localhost:3000/Document/images/' + props._id).then((res) => {
    
    const a = items.length == 0 ? true : false
    const data = res.data 
    props.action({type:'CURF',currentF:{name : Name,child : children, id : props._id,data}})

    }).catch((err) => {
      const a = items.length == 0 ? true : false

      props.action({type:'CURF',currentF:{name : Name,child : children, id : props._id,err:err.message}})
    })
  
}
  const IconChanger = () => {
    switch(props.icon){
      case 0:
        return <Icon color="primary" />
        break;
      case 1: 
        return <Icon color="secondary" />
        break;

      case 2: 
        return <Icon color={"error"} />
        break;

      case 3: 
        return <Icon color={"action"} />
        break;

      case 4: 
        return <Icon color={"inherit"} />
        break;

      case 5: 
        return <Icon color={"disabled"} />
        break;
      default:
        return <Icon color="secondary" />
    }
  }
  const MenuItemRoot = (
    <ListItem button className={classes.menuItem} onClick={handleClick}>
      {/* Display an icon if any */}
      {!!Icon && (
        <ListItemIcon className={classes.menuItemIcon}>
          {/* {props.icon ? (<Icon color="primary" />): ( <Icon color="secondary" />)} */}
        <IconChanger/>
        </ListItemIcon>
      )}
      <ListItemText primary={name} inset={!Icon} />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </ListItem>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <AppMenuItem action={props.action} icon={props.icon + 1} type={false} {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  )
}

AppMenuItem.propTypes = AppMenuItemPropTypes

const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {},
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenuItem
