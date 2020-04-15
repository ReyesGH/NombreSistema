package mx.com.smart.payment.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexCtrl {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String showLoginPage(ModelMap model) {
		model.put("site", "SmartyDreams.com");
		String idDashBoard = "transacciones";
		model.put("idDashBoard", idDashBoard);
		
		return "dashBoard/" + idDashBoard ;
	}
	
	@RequestMapping(value = "/settings", method = RequestMethod.GET)
	public String showSettings(ModelMap model) {
		model.put("site", "SmartyDreams.com");
		return "generales/settings";
	}

	@RequestMapping(value = "/inicio", method = RequestMethod.GET)
	public String greeting() {
		return "welcome";
	}
}
