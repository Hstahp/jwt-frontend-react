import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import './Role.scss';
const Role = ({ props }) => {
    const [listChild, setListChild] = useState({
        child1: { url: '', description: '' },
    });

    useEffect(() => {
        Object.entries(listChild).map(([key, value]) => {
            console.log(key, value);
        });
    }, []);

    const handleOnchangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[key][name] = value;
        setListChild(_listChild);
    };

    const handleAddNewInput = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child-${uuidv4()}`] = { url: '', description: '' };
        setListChild(_listChild);
    };

    const handleDeleteInput = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key];
        setListChild(_listChild);
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="mt-4">
                    <div className="title-role mb-4">
                        <h4>Add a new role</h4>
                    </div>
                    <div className="role-parent">
                        {Object.entries(listChild).map(([key, child], index) => {
                            return (
                                <div className="row role-child align-items-center mb-3" key={`child-${key}`}>
                                    <div className="role-row-badge col-auto d-none d-md-block">
                                        <span>#{index + 1}</span>
                                    </div>
                                    <div className="col-md col-12 form-group form-floating mb-2 mb-md-0">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter URL"
                                            value={child.url}
                                            onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                        />
                                        <label>URL</label>
                                    </div>
                                    <div className="col-md col-12 form-group form-floating mb-2 mb-md-0">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter description"
                                            value={child.description}
                                            onChange={(event) =>
                                                handleOnchangeInput('description', event.target.value, key)
                                            }
                                        />
                                        <label>Description</label>
                                    </div>
                                    <div className="col-md-2 col-12 d-flex align-items-center gap-2 actions-container mt-2 mt-md-0">
                                        <button 
                                            type="button" 
                                            className="btn btn-action btn-add-row" 
                                            onClick={() => handleAddNewInput()}
                                            title="Add another role input"
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                        {index > 0 && (
                                            <button 
                                                type="button" 
                                                className="btn btn-action btn-delete-row" 
                                                onClick={() => handleDeleteInput(key)}
                                                title="Delete this role input"
                                            >
                                                <i className="fa fa-trash-o"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="mt-4">
                            <button className="btn btn-save d-flex align-items-center gap-2">
                                <i className="fa fa-save"></i>
                                <span>Save Roles</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Role;
