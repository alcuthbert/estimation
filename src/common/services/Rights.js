import {ROLE_ADMIN} from '@/resources/roles'
import {ROLE_ARCHITECT} from '@/resources/roles'
import {ROLE_MANAGER} from '@/resources/roles'

import {RIGHTS_CR_CREATE} from '@/common/resources/rights.js'
import {RIGHTS_CR_EDIT} from '@/common/resources/rights.js'
import {RIGHTS_CR_DELETE} from '@/common/resources/rights.js'
import {RIGHTS_CR_APPROVE} from '@/common/resources/rights.js'
import {RIGHTS_CR_ASSIGN} from '@/common/resources/rights.js'

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
    }
}