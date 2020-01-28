import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selectors';
class Directory extends React.Component{

    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div className='directory-menu'>
                {this.props.sections.map(({id,...otherSectionProps}) => {
                    return <MenuItem key={id} {...otherSectionProps}/>
                })}
            </div>
        );
    }

}

const mapStateToProps = createStructuredSelector ({
  sections : selectDirectorySections
});

export default connect(mapStateToProps)(Directory);