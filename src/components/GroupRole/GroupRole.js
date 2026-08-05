import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { fetchGroup } from '../../services/userService';
import { fetchAllRoles, fetchRolesByGroup, assignRolesToGroup } from '../../services/roleService';
import './GroupRole.scss';

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [selectGroup, setSelectGroup] = useState('');

    const [assignRoleByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => {
        getGroups();
        getAllRoles();
    }, []);

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
        } else {
            toast.error(res.EM);
        }
    };

    const getAllRoles = async () => {
        let response = await fetchAllRoles();
        if (response && +response.EC === 0) {
            setListRoles(response.DT);
        } else {
            toast.error(response.EM);
        }
    };

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRolesByGroup(value);
            if (data && +data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
                setAssignRolesByGroup(result);
            }
        }
    };

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map((role) => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some((item) => item.url === object.url);
                }
                result.push(object);
            });
        }
        return result;
    };

    const handleSelectRole = (value) => {
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        let foundIndex = _assignRoleByGroup.findIndex((item) => +item.id === +value);
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRoleByGroup);
    };

    const buildDataToSave = () => {
        let result = {};
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        result.groupId = selectGroup;
        let groupRolesFilter = _assignRoleByGroup.filter((item) => item.isAssigned === true);
        let finalGroupRoles = groupRolesFilter.map((item) => {
            let data = { groupId: +selectGroup, roleId: +item.id };
            return data;
        });
        result.groupRoles = finalGroupRoles;
        return result;
    };

    const handleSaveRole = async () => {
        let data = buildDataToSave();
        let res = await assignRolesToGroup(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="group-role-container">
            <div className="container">
                <div className="header-role">
                    <div className="container mt-3">
                        <h4>Group Role</h4>
                        <div className="assign-group-role">
                            <div className="col-12 col-sm-6 form-group">
                                <label>
                                    Select Group (<span className="red">*</span>)
                                </label>
                                <select
                                    className={'form-select'}
                                    onChange={(event) => handleOnchangeGroup(event.target.value)}
                                >
                                    <option value="">Please choose your group</option>
                                    {userGroups.length > 0 &&
                                        userGroups.map((item, index) => {
                                            return (
                                                <option key={`group=${index}`} value={item.id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <hr />
                        {selectGroup && (
                            <div className="roles">
                                <h5>Assign Role</h5>
                                {assignRoleByGroup &&
                                    assignRoleByGroup.length > 0 &&
                                    assignRoleByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssigned}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        );
                                    })}
                                <div className="mt-3">
                                    <button className="btn btn-warning" onClick={() => handleSaveRole()}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupRole;
