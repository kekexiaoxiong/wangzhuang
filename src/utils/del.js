exports.install = function(Vue, options) {
    Vue.prototype.delCommon = function(data) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                deleteRole(data.id).then(response => {
                    if (response.code == 200) {
                        this.getRoleData();
                    }
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    };
};