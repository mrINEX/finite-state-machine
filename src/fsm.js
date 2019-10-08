class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config === undefined)
            throw new name('Error');
        this.getSt = 'normal';
        this.historytrigger = ['normal'];
        this.eve=[];
        this.historydel = [];
        this.und = 0;
        this.red = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.getSt;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state !== 'normal' && state !== 'hungry' && state !== 'busy' && state !=='sleeping')
            throw new eer('Error');
        else
            {this.eve.push(state); this.historytrigger.push(this.getSt); this.getSt = state;} //this.change = this.getSt; 
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
            
        if(event === 'study' && this.getSt === 'normal')
            {this.getSt = 'busy'; this.historytrigger.push('busy'); this.eve.push('study');}
        else if(event === 'get_tired' && this.getSt === 'busy')
            {this.getSt = 'sleeping'; this.historytrigger.push('sleeping');this.eve.push('get_tired');}
        else if(event === 'get_hungry' && this.getSt === 'busy' || event === 'get_hungry' && this.getSt === 'sleeping')
            {this.getSt = 'hungry'; this.historytrigger.push('hungry');this.eve.push('get_hungry');} ////
        else if(event === 'eat' && this.getSt === 'hungry')
            {this.getSt = 'normal'; this.historytrigger.push('normal');this.eve.push('eat');}
        else if(event === 'get_up' && this.getSt === 'sleeping')
            {this.getSt = 'normal'; this.historytrigger.push('normal');this.eve.push('get_up');}
        else
            throw new name('Error');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        if(this.getSt !== 'normal')
            this.getSt = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(event === undefined)
            return ['normal', 'busy', 'hungry', 'sleeping'];
        if(event === 'get_hungry')
            return ['busy', 'sleeping'];
        if(event === 'study')
            return ['normal'];
        if(event === 'get_tired')
            return ['busy'];
        if(event === 'eat')
            return ['hungry'];
        if(event === 'get_up')
            return ['sleeping'];
        else
            return [];
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        this.und += 1;
        if(this.getSt === 'normal')
            return false;
        
        console.log('(undo) getSt ^: ['+this.getSt+'] his: '+this.historytrigger);
        this.getSt = this.historytrigger[this.historytrigger.length-2];
        console.log('(undo) getSt _: ['+this.getSt+'] his: '+this.historytrigger);
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        this.red += 1;
        if(this.red === this.und)
        {
            console.log('(redo) getSt ^: ['+this.getSt+'] his: '+this.historytrigger);
            this.getSt = this.historytrigger[this.historytrigger.length-1];
            console.log('(redo) getSt _: ['+this.getSt+'] his: '+this.historytrigger);
            return true;
        }
        if(this.getSt === 'normal')
            return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.getSt = 'normal';
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
