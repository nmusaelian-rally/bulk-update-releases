Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        var releasePicker = Ext.create('Ext.Container', {
            items: [{
                xtype: 'rallymultiobjectpicker',
                modelType: 'Release',
                itemId: 'multiReleasePicker',
                storeConfig:{
                    fetch:['Name','ObjectID','Theme']
                }
            }]
        });
        this.add(releasePicker);
        this.add({
            xtype: 'rallybutton',
            itemId: 'getReleasesButton',
            text: 'getReleases',
            handler: function(){
                this._onReleasesSelected();
            },
            scope: this
        });
    },
    _onReleasesSelected: function() {
        var count = 0;
        var selectedReleases = this.down('rallymultiobjectpicker')._getRecordValue();
        console.log(selectedReleases.length);
        var releases;
        var numOfDays = 2;
        if (selectedReleases.length > 0) {
            _.each(selectedReleases, function(release){
                console.log('release:',release.data.ObjectID, 'release theme:', release.get('Theme'));
                release.set('Theme', 'some text goes here...');
                release.save({
                    callback: function(result, operation) {
                        if(operation.wasSuccessful()) {
                            console.log('success', release.get('Theme'));
                        }
                    }
                });
            });
        }
    }
});
