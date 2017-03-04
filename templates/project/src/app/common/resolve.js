module.factory('resolve', function() {
    var aryIndexRx = /\[(.*?)\]/g;

    function pathToArray(path, delimiter) {
        if (path instanceof Array) {
            return path;
        }
        delimiter = delimiter || '.';
        path = path || '';
        path = path.replace(aryIndexRx, delimiter + "$1");
        return path.split(delimiter);
    }

    function Resolve(data) {
        this.data = data || {};
    }

    var proto = Resolve.prototype;
    proto.get = function (path, delimiter) {
        var arr = pathToArray(path, delimiter),
            space = '',
            i = 0,
            len = arr.length;

        var data = this.data;

        while (data && i < len) {
            space = arr[i];
            data = data[space];
            if (data === undefined) {
                break;
            }
            i += 1;
        }
        return data;
    };

    proto.set = function (path, value, delimiter) {
        if(path === undefined) {
            throw new Error('Resolve requires "path"');
        }
        var arr = pathToArray(path, delimiter),
            space = '',
            i = 0,
            len = arr.length - 1;

        var data = this.data;

        while (i < len) {
            space = arr[i];
            if (data[space] === undefined) {
                data = data[space] = {};
            } else {
                data = data[space];
            }
            i += 1;
        }
        if (arr.length > 0) {
            data[arr.pop()] = value;
        }
        return this.data;
    };

    proto.default = function(path, value, delimiter) {
        if(this.get(path, delimiter) === undefined) {
            this.set(path, value, delimiter);
        }
    };

    proto.clear = function () {
        var d = this.data;
        for (var e in d) {
            if(d.hasOwnProperty(e)) {
                delete d[e];
            }
        }
    };

    proto.path = function (path) {
        return this.set(path, {});
    };

    var resolve = function (data) {
        return new Resolve(data);
    };

    return resolve;
});