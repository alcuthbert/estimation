import {ROLE_ADMIN} from '@/resources/roles'
import {ROLE_ARCHITECT} from '@/resources/roles'
import {ROLE_MANAGER} from '@/resources/roles'

export const RIGHTS_CR_EDIT = 'cr::edit'
export const RIGHTS_CR_DELETE = 'cr::delete'
export const RIGHTS_CR_APPROVE = 'cr::approve'
export const RIGHTS_CR_ASSIGN = 'cr::assign'

export default {
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