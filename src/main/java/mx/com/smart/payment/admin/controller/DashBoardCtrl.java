package mx.com.smart.payment.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DashBoardCtrl {

	@RequestMapping(value = "/dashBoard/{idDashBoard}", method = RequestMethod.GET)
	public String showSettings(@PathVariable("idDashBoard") String idDashBoard, ModelMap model) {
		model.put("site", "SmartyDreams.com");
		model.put("idDashBoard", idDashBoard);
		
		return "dashBoard/" + idDashBoard ;
	}

}
