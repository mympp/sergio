<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="loginuser">
    <shiro:principal/>
</c:set>
<c:choose>
    <c:when test="${empty loginuser}">
        <c:redirect url="/background/login.do"/>
    </c:when>
    <c:otherwise>
        <c:redirect url="/background/index.do"/>
    </c:otherwise>
</c:choose>