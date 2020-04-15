package mx.com.smart.payment.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ClientesCtrl {


	@RequestMapping(value = "/perfil", method = RequestMethod.GET)
	public String showSettings(ModelMap model) {
		model.put("site", "SmartyDreams.com");
		return "configuration/users/perfil";
	}


}
