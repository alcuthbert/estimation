import {
    RIGHTS_CR_CREATE,
    RIGHTS_CR_EDIT,
    RIGHTS_CR_DELETE,
    RIGHTS_CR_APPROVE,
    RIGHTS_CR_ASSIGN,
    RIGHTS_CR_CLOSE,
    RIGHTS_CR_MERGE,
    RIGHTS_TASK_CREATE,
    RIGHTS_TASK_EDIT,
    RIGHTS_TASK_DELETE,
    RIGHTS_SUBTASK_CREATE,
    RIGHTS_SUBTASK_EDIT,
    RIGHTS_SUBTASK_DELETE,
    RIGHTS_ESTIMATION_CREATE
} from '@/common/resources/rights'

import {
    ROLE_ADMIN,
    ROLE_ARCHITECT,
    ROLE_MANAGER,
    ROLE_ESTIMATOR
} from '@/common/resources/roles'

const managerRights = [
    RIGHTS_CR_APPROVE,
    RIGHTS_CR_ASSIGN,
    RIGHTS_CR_CLOSE,
    RIGHTS_CR_MERGE,
    RIGHTS_TASK_CREATE,
    RIGHTS_TASK_EDIT,
    RIGHTS_TASK_DELETE,
    RIGHTS_SUBTASK_CREATE,
    RIGHTS_SUBTASK_EDIT,
    RIGHTS_SUBTASK_DELETE
]
const estimatorRights = [
    RIGHTS_ESTIMATION_CREATE
]
const architectRights = [
    RIGHTS_CR_CREATE,
    RIGHTS_CR_EDIT,
    RIGHTS_CR_DELETE
]

export default {
    check(role, right) {
        if (role === null || role === undefined) {
            return false
        }

        switch(role) {
            case ROLE_ADMIN:
                return true
            case ROLE_MANAGER:
                return managerRights.indexOf(right) !== -1
            case ROLE_ARCHITECT:
                return architectRights.indexOf(right) !== -1
            case ROLE_ESTIMATOR:
                return estimatorRights.indexOf(right) !== -1
            default:
                return false
        }
    }
}