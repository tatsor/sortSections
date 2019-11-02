'use strict'

const actions = {
    UP: 'up',
    DOWN: 'down',
    HIDE: 'hide',
    RESTORE: 'restore',
    DELETE: 'delete',
    ADD: 'add'
};

const HIDDEN_SECTIONS_START_INDEX = 10000;

function sortArray(sectionsArray, section, action) {
    const index = findWithAttr(sectionsArray, 'order', section.order);
    console.log('Index', index);
    switch (action) {
        case (actions.UP):
            if (section.order < HIDDEN_SECTIONS_START_INDEX) {
                swap(sectionsArray, index - 1, index);
            }           
            break;
        case (actions.DOWN):
            if (section.order < HIDDEN_SECTIONS_START_INDEX) {
                swap(sectionsArray, index, index + 1);
            }
            break;
        case (actions.DELETE):
            removeEnabledSection(sectionsArray, index, section.order);
            break;
        case (actions.HIDE):
            if(section.order < HIDDEN_SECTIONS_START_INDEX) {
                const hiddenSectionIndex = findFirstHiddenSection(sectionsArray);
                if (hiddenSectionIndex > -1) {
                    for (let i = hiddenSectionIndex; i < sectionsArray.length; i++) {
                        sectionsArray[i].order++;
                    }
                    sectionsArray.splice(hiddenSectionIndex, 0, section);
                }
                else {
                    sectionsArray.push(section);
                }
                removeEnabledSection(sectionsArray, index, section.order);
                section.order = HIDDEN_SECTIONS_START_INDEX;
            }
            break;
        case (actions.RESTORE):
            if(section.order >= HIDDEN_SECTIONS_START_INDEX) {
                const hiddenSectionIndex = findFirstHiddenSection(sectionsArray);
                console.log('hidden section index: ', hiddenSectionIndex);
                if (hiddenSectionIndex > -1) {
                    sectionsArray.splice(index, 1);
                    sectionsArray.splice(hiddenSectionIndex, 0, section);
                    sectionsArray[hiddenSectionIndex].order = hiddenSectionIndex + 1;
                }
                else {
                    throw new Error ('Implementation error');
                }
            }
            break;
        case (actions.ADD):
            if (section.order > sectionsArray.length + 1) {
                throw new Error('Specified position is incorrect');
            }
            let hiddenSectionIndex = findFirstHiddenSection(sectionsArray);
            
            
            if (hiddenSectionIndex > -1) {
                if (section.order > hiddenSectionIndex + 1) {
                    throw new Error('Specified position is incorrect');
                }
            }
            else {
                hiddenSectionIndex = sectionsArray.length;
            }

            sectionsArray.splice(section.order - 1, 0, section);
            for (let i = 0; i <= hiddenSectionIndex; i++) {
                sectionsArray[i].order = i + 1;
            }

            break;
        default:
            throw new Error('action is not implemented');
    }
    // console.log('Array ', sectionsArray);
    return sectionsArray;
}

function swap(array, index1, index2) {
    console.log('In swap, index 1 %s, index 2 %s', index1, index2);
    if (index2 >=0 && index1 >=0 && index1 < array.length && index2 < array.length) {
        var tmp = array[index1];
        array[index1] = array[index2];
        array[index1].order = index1 + 1;
        array[index2] = tmp;
        array[index2].order = index2 + 1;
    }
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function findFirstHiddenSection(array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].order >= HIDDEN_SECTIONS_START_INDEX) {
            return i;
        }
    }
    return -1;
}

function removeEnabledSection(array, index, order) {
    array.splice(index, 1);
    if (order < HIDDEN_SECTIONS_START_INDEX) {
        for (let i = index; i < array.length; i++) {
            if(array[i].order < HIDDEN_SECTIONS_START_INDEX) {
                array[i].order = i + 1;
            }
            else {
                break;
            }
        }
    }
}

module.exports = {
    actions,
    sortArray,
    HIDDEN_SECTIONS_START_INDEX
}

