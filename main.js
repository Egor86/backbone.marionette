
var myItemView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile($('#contacts-template').html())
});

var myCollectionView = Backbone.Marionette.CollectionView.extend({
    tagName: "table",
    childView: myItemView
});

var userView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile($('#user-template').html())
});

var myModel = Backbone.Model.extend({
    urlRoot : '/data'
});

var collection = Backbone.Collection.extend({
    model: myModel
});

var Route = Backbone.Marionette.AppRouter.extend({

    routes : {
        'contacts/:user_id' : 'getUser',
        'contacts/' : 'getContacts'
    },

    getUser: function(user_id){
        var model = new myModel({
            id: 'test-' + user_id + '.json'
        });
        model.fetch({
            success: function (data) {
                var view = new userView({
                    model: data
                });
                var render = view.render();
                $('#result').html(render.el);
            }
        })

    },

    getContacts: function(){
        var myCollection = new collection();
        myCollection.url = '/data/test-list.json';
        myCollection.fetch({
                success: function (data) {
                    var myDataView = new myCollectionView({
                        collection: data
                    });
                    var render = myDataView.render();
                    $('#result').html(render.el);
                }
            }
        )}
});

$(function() {
    var route = new Route();
    Backbone.history.start();
})
