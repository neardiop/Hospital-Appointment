package org.jhipster.blog.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.MessageFactory;
import com.twilio.sdk.resource.instance.Message;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

import com.twilio.sdk.resource.factory.CallFactory;
import com.twilio.sdk.resource.instance.Call;

@Service
@Transactional
public class SmsService {

    private final Logger log = LoggerFactory.getLogger(SmsService.class);
    public static final String ACCOUNT_SID = "AC79bea770976f9c40f189647b3a2e8b72";
    public static final String AUTH_TOKEN = "68b91b13c0e9e87aa2d191c45e9f7326";
    public static final String TWILIO_NUMBER = "+12079945404";

    public void sendSMS(int num ,String to) {
        try {
            TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

            // Build a filter for the MessageList
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            switch (num){
                case 1:
                params.add(new BasicNameValuePair("Body", "Votre inscription a été prise en compte"));
                break ;
                case 2:
                params.add(new BasicNameValuePair("Body", "Votre compte a été activée avec succées"));
                break;
                case 3:
                params.add(new BasicNameValuePair("Body", "Votre demande de rendez-vous a été prise en compte"));
                break;
                case 4:
                params.add(new BasicNameValuePair("Body", "Votre consultation sera effective dans 48h"));
            } 
            params.add(new BasicNameValuePair("To", to));
            params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

            MessageFactory messageFactory = client.getAccount().getMessageFactory();
            Message message = messageFactory.create(params);
            System.out.println(message.getSid());
        } 
        catch (TwilioRestException e) {
            System.out.println(e.getErrorMessage());
        }
    }

}
