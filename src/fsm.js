class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config === undefined)
            throw new name('Error');
        this.getSt = 'normal';
        this.addstate = [];
        this.addstatetr = [];
        this.forredo = [];
        this.change;
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
            {this.change = this.getSt;
             this.addstatetr.push(this.getSt);
             this.getSt = state;} //this.addstatetr.push(state); 
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        
        if(event === 'study' && this.getSt === 'normal')
            {this.getSt = 'busy';     this.addstatetr.push('busy');}
        else if(event === 'get_tired' && this.getSt === 'busy')
            {this.getSt = 'sleeping'; this.addstatetr.push('sleeping');}
        else if(event === 'get_hungry' && this.getSt === 'busy' || event === 'get_hungry' && this.getSt === 'sleeping')
            {this.getSt = 'hungry';   this.addstatetr.push('hungry');}
        else if(event === 'eat' && this.getSt === 'hungry')
            {this.getSt = 'normal';   this.addstatetr.push('normal');}
        else if(event === 'get_up' && this.getSt === 'sleeping')
            {this.getSt = 'normal';   this.addstatetr.push('normal');}
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
        
        if(this.addstatetr.length === 0)
            return false;

            console.log('--- state[tr]: '+this.addstatetr);
            if(this.change !== undefined)
                {console.log('ch: '+this.change);
                this.getSt = this.change;}
            if(this.addstatetr[this.addstatetr.length - 1] === 'busy')
                {this.getSt = 'normal';
                this.forredo.push(this.addstatetr.pop());}
            if(this.addstatetr[this.addstatetr.length - 1] === 'hungry')
                {this.getSt = 'busy';
                this.forredo.push(this.addstatetr.pop());}
            
            console.log('state[tr] ---: '+this.addstatetr);
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        this.addstatetr = [];
        console.log('redo[tr] ---: '+this.addstatetr);
        console.log('forredo ---: '+this.forredo);
        if(this.forredo.length === 0)
            return false;
            this.getSt = this.forredo.pop();
            this.forredo = [];
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.addstatetr = [];
        this.forredo = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
