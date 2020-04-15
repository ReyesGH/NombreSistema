package mx.com.smart.payment.admin.entities;

public class Tpv {

    private Integer idPos;
    private String ip;
    private Integer port;
    private String tipoDispositivo;
    private Integer idCliente;
    private Integer ipPlataforma;
    private Integer portPlataforma;
    private String tipoHardware;
    private String versionSistemaOperativo;
    private String regionAcceso;
    private String pais;
    private String estado;
    private String direccion;
    private String usuario;
    private String grupo;
    private String rol;

    public Integer getIdPos() {
        return idPos;
    }

    public void setIdPos(Integer idPos) {
        this.idPos = idPos;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getTipoDispositivo() {
        return tipoDispositivo;
    }

    public void setTipoDispositivo(String tipoDispositivo) {
        this.tipoDispositivo = tipoDispositivo;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIpPlataforma() {
        return ipPlataforma;
    }

    public void setIpPlataforma(Integer ipPlataforma) {
        this.ipPlataforma = ipPlataforma;
    }

    public Integer getPortPlataforma() {
        return portPlataforma;
    }

    public void setPortPlataforma(Integer portPlataforma) {
        this.portPlataforma = portPlataforma;
    }

    public String getTipoHardware() {
        return tipoHardware;
    }

    public void setTipoHardware(String tipoHardware) {
        this.tipoHardware = tipoHardware;
    }

    public String getVersionSistemaOperativo() {
        return versionSistemaOperativo;
    }

    public void setVersionSistemaOperativo(String versionSistemaOperativo) {
        this.versionSistemaOperativo = versionSistemaOperativo;
    }

    public String getRegionAcceso() {
        return regionAcceso;
    }

    public void setRegionAcceso(String regionAcceso) {
        this.regionAcceso = regionAcceso;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Tpv(Integer idPos, String ip, Integer port, String tipoDispositivo, Integer idCliente, Integer ipPlataforma,
            Integer portPlataforma, String tipoHardware, String versionSistemaOperativo, String regionAcceso,
            String pais, String estado, String direccion, String usuario, String grupo, String rol) {
        this.idPos = idPos;
        this.ip = ip;
        this.port = port;
        this.tipoDispositivo = tipoDispositivo;
        this.idCliente = idCliente;
        this.ipPlataforma = ipPlataforma;
        this.portPlataforma = portPlataforma;
        this.tipoHardware = tipoHardware;
        this.versionSistemaOperativo = versionSistemaOperativo;
        this.regionAcceso = regionAcceso;
        this.pais = pais;
        this.estado = estado;
        this.direccion = direccion;
        this.usuario = usuario;
        this.grupo = grupo;
        this.rol = rol;
    }

    public Tpv() {
    }

}