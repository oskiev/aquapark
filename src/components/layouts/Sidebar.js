import React, { Component } from 'react';

const ProductCategories = [
    { id: 1, name: 'Climbing/Sliding', data: 'items1' },
    { id: 2, name: 'Running/Walking', data: 'items2' },
    { id: 3, name: 'Balance', data: 'items3' },
    { id: 4, name: 'Agility/Jumping', data: 'items4' },
    { id: 5, name: 'Leisure', data: 'items2' },
    { id: 6, name: 'Essentials', data: 'items1' },
    { id: 7, name: 'Accessesories', data: 'items2' },
]


class Sidebar extends Component {
    render() {

        return (
            <div className='sidebar'>
                <div className='sidebar-menu'>
                    <span><i className="fas fa-file-alt"></i> New Build</span>
                    <span><i className="fas fa-folder-open"></i> Open</span>
                </div>
                <div className="sidebar-menu">
                    <span><i className="fas fa-save"></i> Save</span>
                    <span><i className="fas fa-save"></i> Save as</span>
                    <span><i className="fas fa-share"></i> Share</span>
                </div>
                <div className="sidebar-menu">
                    <div className="sidebar-menu-heading">
                        <span onClick={() => this.props.open('products')}>Products</span>
                        <div className="sidebar-menu-toggle" onClick={() => this.props.open('products')}><i className="fas fa-plus"></i></div>
                    </div>
                    <div className={this.props.subProducts }>
                        {
                            ProductCategories.map((item) => (
                                 <span key={item.id} className={ (this.props.productActive === item.name) ? 'active' : '' } onClick={() => this.props.update(item.data, item.name)}><i className="fas fa-cube"></i> {item.name}</span>
                            ))
                        }

                    </div>
                </div>
                <div className="sidebar-menu">
                    <div className="sidebar-menu-heading">
                        <span onClick={() => this.props.open('collections')}>Collections</span>
                        <div className="sidebar-menu-toggle" onClick={() => this.props.open('collections')}><i className="fas fa-plus"></i></div>
                    </div>
                    <div className={this.props.subCollections }>
                        <span><i className="fas fa-cubes"></i> Cascade</span>
                        <span><i className="fas fa-cubes"></i> Serria</span>
                        <span><i className="fas fa-cubes"></i> Olympic</span>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <span><i className="fas fa-external-link-alt"></i> Publish to 3d</span>
                </div>
            </div>
        );
    }
}

export default Sidebar;
