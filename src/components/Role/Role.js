import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import { createRoles } from '../../services/roleService';
import TableRole from './TableRole';
import './Role.scss';
const Role = ({ props }) => {
    const childRef = useRef();
    const dataChildDefault = {
        url: '',
        description: '',
        isValidUrl: true,
    };

    const [listChild, setListChild] = useState({
        child1: dataChildDefault,
    });

    useEffect(() => {
        Object.entries(listChild).map(([key, value]) => {
            console.log(key, value);
        });
    }, []);

    const handleOnchangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[key][name] = value;
        if (value && name === 'url') {
            _listChild[key]['isValidUrl'] = true;
        }
        setListChild(_listChild);
    };

    const handleAddNewInput = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child-${uuidv4()}`] = dataChildDefault;
        setListChild(_listChild);
    };

    const handleDeleteInput = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key];
        setListChild(_listChild);
    };

    const buildDataToPersist = () => {
        let _listChild = _.cloneDeep(listChild);
        let result = [];

        Object.entries(_listChild).forEach(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description,
            });
        });

        return result;
    };

    const handleSave = async () => {
        let invalidObj = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url;
        });
        if (!invalidObj) {
            //call api
            let data = buildDataToPersist();
            let res = await createRoles(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetchListRolesAgain();
                setListChild({
                    child1: dataChildDefault,
                });
            } else {
                toast.error(res.EM);
            }
        } else {
            let _listChild = _.cloneDeep(listChild);
            const key = invalidObj[0];
            _listChild[key]['isValidUrl'] = false;
            setListChild(_listChild);
            toast.error('Input URL must not be empty....');
        }
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="adding-roles mt-3">
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
                                            className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
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
                            <button
                                className="btn btn-save d-flex align-items-center gap-2"
                                onClick={() => handleSave()}
                            >
                                <i className="fa fa-save"></i>
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mt-3">
                    <h4>List Current Roles</h4>
                </div>
                <TableRole ref={childRef} />
            </div>
        </div>
    );
};

export default Role;
