import {ROLE_ADMIN} from '@/common/resources/roles'
import {ROLE_ARCHITECT} from '@/common/resources/roles'
import {ROLE_MANAGER} from '@/common/resources/roles'
import {ROLE_ESTIMATOR} from '@/common/resources/roles'

import {RIGHTS_CR_CREATE} from '@/common/resources/rights.js'
import {RIGHTS_CR_EDIT} from '@/common/resources/rights.js'
import {RIGHTS_CR_DELETE} from '@/common/resources/rights.js'
import {RIGHTS_CR_APPROVE} from '@/common/resources/rights.js'
import {RIGHTS_CR_ASSIGN} from '@/common/resources/rights.js'
import {RIGHTS_CR_CLOSE} from '@/common/resources/rights'

import {RIGHTS_TASK_CREATE} from '@/common/resources/rights'
import {RIGHTS_TASK_EDIT} from '@/common/resources/rights'
import {RIGHTS_TASK_DELETE} from '@/common/resources/rights'

import {RIGHTS_SUBTASK_CREATE} from '@/common/resources/rights'
import {RIGHTS_SUBTASK_EDIT} from '@/common/resources/rights'
import {RIGHTS_SUBTASK_DELETE} from '@/common/resources/rights'

import {RIGHTS_ESTIMATION_CREATE} from '@/common/resources/rights'

export default {
    check(role, right) {
        if (role === null || role === undefined) {
            return false
        }

        switch(right) {
            case RIGHTS_CR_CREATE:
                return this.changeRequestCreate(role)
            case RIGHTS_CR_EDIT:
                return this.changeRequestEdit(role)
            case RIGHTS_CR_DELETE:
                return this.changeRequestDelete(role)
            case RIGHTS_CR_APPROVE:
                return this.changeRequestApprove(role)
            case RIGHTS_CR_ASSIGN:
                return this.changeRequestAssign(role)
            case RIGHTS_CR_CLOSE:
                return this.changeRequestClose(role)
            case RIGHTS_TASK_CREATE:
                return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
            case RIGHTS_TASK_EDIT:
                return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
            case RIGHTS_TASK_DELETE:
                return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
            case RIGHTS_SUBTASK_CREATE:
                return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
            case RIGHTS_SUBTASK_EDIT:
                return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
            case RIGHTS_SUBTASK_DELETE:
                return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
            case RIGHTS_ESTIMATION_CREATE:
                return (role === ROLE_ADMIN || role === ROLE_ESTIMATOR) ? true : false
            default:
                return false
        }
    },
    changeRequestCreate(role) {
        return (role === ROLE_ADMIN || role === ROLE_ARCHITECT) ? true : false
    },
    changeRequestEdit(role) {
        return (role === ROLE_ADMIN || role === ROLE_ARCHITECT) ? true : false
    },
    changeRequestDelete(role) {
        return (role === ROLE_ADMIN || role === ROLE_ARCHITECT) ? true : false
    },
    changeRequestApprove(role) {
        return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
    },
    changeRequestAssign(role) {
        return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
    },
    changeRequestClose(role) {
        return (role === ROLE_ADMIN || role === ROLE_MANAGER) ? true : false
    }
}