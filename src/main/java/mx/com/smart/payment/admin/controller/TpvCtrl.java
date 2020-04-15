package mx.com.smart.payment.admin.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mx.com.smart.payment.admin.entities.Tpv;

@Controller
public class TpvCtrl {
    @RequestMapping(value = "/tpv", method = RequestMethod.GET)
	public String showSettings(ModelMap model) {
		List<Tpv> tpv = new ArrayList<>();
		tpv.add(new Tpv(0001,"131.178.0.1",80,"Clip",00100,00200,80,"Inalambrica","0.0.1","Baja California","México","Baja California","P-151 Tijuana, B.C.","POS","TVP","Vendedor"));
		tpv.add(new Tpv(0001,"131.178.0.1",80,"GlopDroid",00100,00200,80,"Inalambrica","0.0.1","Baja California","México","Baja California","P-151 Tijuana, B.C.","POS","TVP","Vendedor"));
		tpv.add(new Tpv(0001,"131.178.0.1",80,"Pozool",00100,00200,80,"Inalambrica","0.0.1","Baja California","México","Baja California","P-151 Tijuana, B.C.","POS","TVP","Vendedor"));
		tpv.add(new Tpv(0001,"131.178.0.1",80,"TPVAND",00100,00200,80,"Inalambrica","0.0.1","Baja California","México","Baja California","P-151 Tijuana, B.C.","POS","TVP","Vendedor"));
		tpv.add(new Tpv(0001,"131.178.0.1",80,"TPV Simple Bar",00100,00200,80,"Inalambrica","0.0.1","Baja California","México","Baja California","P-151 Tijuana, B.C.","POS","TVP","Vendedor"));
		tpv.add(new Tpv(0001,"131.178.0.1",80,"Bar POS",00100,00200,80,"Inalambrica","0.0.1","Baja California","México","Baja California","P-151 Tijuana, B.C.","POS","TVP","Vendedor"));
		tpv.add(new Tpv(0001,"131.178.0.1",80,"Cashy-POS Lite",00100,00200,80,"Inalambrica","0.0.1","Baja California","México","Baja California","P-151 Tijuana, B.C.","POS","TVP","Vendedor"));
		model.put("site", "SmartyDreams.com");
		model.put("tpv", tpv);
		return "operation/tpv/tpv";
	}
}